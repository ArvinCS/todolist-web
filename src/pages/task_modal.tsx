import { Input, Modal, Textarea } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";

export interface TaskModalData {
    title: string,
    description: string,
    agenda_date: Date | null,
    status: string,
}

export function TaskModal({opened, close, onSubmit, formData, setFormData} : {opened: boolean, close: () => void, onSubmit: () => void, formData: TaskModalData, setFormData: any}) {
    const providedStatus: string[] = ["To Do", "On Progress", "Done"];
    return (
        <Modal opened={opened} onClose={close} title={<strong>Task</strong>} centered>
            <div className="space-y-1">
                <label className="font-bold">
                    Title
                </label>
                <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}>
                </Input>
                <label className="font-bold">
                    Description
                </label>
                <Textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} autosize minRows={4} maxRows={12}>
                </Textarea>
                <label className="font-bold">
                    Agenda Date
                </label>
                <DateTimePicker value={formData.agenda_date} onChange={e => setFormData({...formData, agenda_date: e})} />
                <label className="font-bold">
                    Status
                </label>
                <div className="flex flex-row justify-between p-2">
                    {providedStatus.map(status => (
                        <button key={status} className="outline outline-offset-2 outline-gray-400 outline-2 rounded-md px-2 py-1 font-semibold" onClick={(e) => {
                            setFormData({...formData, status: status});
                        }}>
                            {status}
                        </button>
                    ))}
                </div>
                <Input value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                </Input>
            </div>
            <button className='bg-blue-600 hover:bg-dark-blue text-white py-2 w-full rounded-md my-5 items-center' type="submit" onClick={onSubmit}>Done</button>
        </Modal>
    );
}