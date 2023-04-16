import { UserTask } from "@/models/task";
import { ArrowPathIcon, ClockIcon, InformationCircleIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Grid, Input, Modal, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { DateTimePicker } from "@mantine/dates";
import app from "@/firebase/firebase";
import { deleteDoc, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { TaskModal, TaskModalData } from "./task_modal";

export function TaskCard({task}: {task: UserTask}) {
    const date: Date = new Date();
    const [opened, { open, close }] = useDisclosure(false);
    const [formData, setFormData] = useState<TaskModalData>({title: "", description: "", agenda_date: new Date(), status: ""});

    useEffect(() => {
        setFormData({
            title: task.title,
            description: task.description,
            agenda_date: task.agenda_date,
            status: task.status,
        });
    }, []);

    const differenceDate = (end: Date, start: Date) => {
        const days = Math.floor((end.getTime() - start.getTime())/(1000 * 60 * 60 * 24));
        const hours = Math.floor((end.getTime() - start.getTime())/(1000 * 60 * 60));
        const minutes = Math.floor((end.getTime() - start.getTime())/(1000 * 60));
        if (days == 0) {
            if (hours == 0) {
                return `${minutes} minutes`;
            } 
            return `${hours} hours`;
        }
        return `${days} days`;
    };

    const submitChange = async () => {
        const firestore = getFirestore(app);
        await setDoc(doc(firestore, "tasks", task.id), {...formData}, {merge: true});
    };

    const deleteTask = async () => {
        const firestore = getFirestore(app);
        await deleteDoc(doc(firestore, "tasks", task.id));
    }

    return <Grid.Col className="flex flex-col bg-white m-2 py-4 px-8 h-[200px] rounded-xl md:h-[300px] drop-shadow-[5px_5px_10px_rgba(0,0,0,0.1)] hover:transition-all hover:drop-shadow-[5px_5px_10px_rgba(0,0,0,0.2)]" sm={4} lg={3}>
        <TaskModal formData={formData} opened={opened} close={close} onSubmit={() => {
            submitChange();
            close();
        }} setFormData={setFormData} />
        <div className="flex justify-between">
            <div className="flex flex-row items-center w-auto space-x-2 my-2">
                <ClockIcon className="h-5 w-5 fill-orange-400"/>
                <p className="text-gray-500">
                    {task.agenda_date.getTime() > date.getTime() ? 
                    `Due in ${differenceDate(task.agenda_date, date)}` :
                    `Late for ${differenceDate(date, task.agenda_date)}`
                    }
                </p>
            </div>
            <div className="flex flex-row space-x-5">
                <TrashIcon className="flex w-6 items-center my-2"
                    onClick={(event) => {
                        deleteTask();
                    }}
                />
                <PencilSquareIcon className="flex w-6 items-center my-2"
                    onClick={(event) => {
                        open();
                    }}
                />
            </div>
        </div>
        <strong className="text-xl">
            {task.title}
        </strong>
        <p className="overflow-clip text-sm py-1 text-gray-500">
            {task.description}
        </p>
        <div className="flex mt-auto items-center space-x-2">
            <InformationCircleIcon className="h-5 w-5"/>
            <p>{task.status}</p>
        </div>
    </Grid.Col>
};