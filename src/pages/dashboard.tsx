import app from "@/firebase/firebase";
import { getCurrentUser } from "@/firebase/firebase_auth";
import { UserTask } from "@/models/task";
import { ArrowPathIcon, ClockIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { Grid, Modal, RingProgress } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { collection, getDocs, getFirestore, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { TaskCard } from "./task_card";
import { useTaskContext } from "@/context/task_context";

export default function DashboardContainer() {
    const { taskList } : any = useTaskContext();
    // const [taskList, setTaskList] = useState<UserTask[]>([]);

    // const firestore = getFirestore(app);
    // const coll = collection(firestore, "tasks");
    // const q = query(coll, where("user_uid", "==", getCurrentUser()?.uid), orderBy("agenda_date", "desc"));

    // const fetchTasks = async () => {
    //     const snapshot = await getDocs(q);

    //     setTaskList(snapshot.docs.map<UserTask>((doc) => ({
    //         id: doc.id,
    //         title: doc.data()["title"],
    //         description: doc.data()["description"],
    //         status: doc.data()["status"],
    //         agenda_date: doc.data()["agenda_date"].toDate(),
    //         user_uid: getCurrentUser()!.uid,
    //     })));
    // };

    // const unsub = onSnapshot(q, (doc) => {
    //     const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    //     if(doc.metadata.hasPendingWrites){
    //         const removedTask: string[] = [];
    //         doc.docChanges().forEach((change) => {
    //             console.log(change);
    //             if (change.type === "removed") {
    //                 removedTask.push(change.doc.id);
    //             }
    //         });
    //         console.log(removedTask);
    //         setTaskList(doc.docs.filter((doc) => !removedTask.includes(doc.id)).map<UserTask>((doc) => ({
    //             id: doc.id,
    //             title: doc.data()["title"],
    //             description: doc.data()["description"],
    //             status: doc.data()["status"],
    //             agenda_date: doc.data()["agenda_date"].toDate(),
    //             user_uid: getCurrentUser()!.uid,
    //         })));
    //     }
    // });

    // useEffect(() => {
    //     if(getCurrentUser() != null) fetchTasks();
    // }, [getCurrentUser()]);

    return (
        <div className="m-1 bg-transparent min-h-screen py-2 px-8 w-full h-auto">
            <Grid grow>
                {
                    taskList?.map((task: UserTask) => (
                        <TaskCard key={task.id} task={task}/>
                        // <Grid.Col className="flex flex-col bg-white m-2 py-4 px-8 h-[200px] rounded-xl md:h-[300px] drop-shadow-[5px_5px_10px_rgba(0,0,0,0.1)] hover:transition-all hover:drop-shadow-[5px_5px_10px_rgba(0,0,0,0.2)]" key={task.id} sm={4} lg={3}>
                        //     <div className="flex justify-between">
                        //         <div className="flex flex-row items-center w-auto space-x-2 my-2">
                        //             <ClockIcon className="h-5 w-5 fill-orange-400"/>
                        //             <p className="text-gray-500">
                        //                 {task.agenda_date.getTime() > date.getTime() ? 
                        //                 `Due in ${differenceDate(task.agenda_date, date)}` :
                        //                 `Late for ${differenceDate(date, task.agenda_date)}`
                        //                 }
                        //             </p>
                        //         </div>
                        //         <PencilSquareIcon className="flex w-6 items-center my-2"
                        //             onClick={(event) => {
                        //                 open();
                        //             }}
                        //         />
                        //     </div>
                        //     <strong className="text-xl">
                        //         {task.title}
                        //     </strong>
                        //     <p className="overflow-clip text-sm py-1 text-gray-500">
                        //         {task.description}
                        //     </p>
                        //     <div className="flex mt-auto items-center space-x-2">
                        //         <ArrowPathIcon className="h-5 w-5"/>
                        //         <p>On Progress</p>
                        //     </div>
                        // </Grid.Col>
                    ))
                }
            </Grid>
        </div>
    );
}