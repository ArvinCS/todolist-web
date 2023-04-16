// import app from '@/firebase/firebase';
// import { getCurrentUser } from '@/firebase/firebase_auth';
// import { UserTask } from '@/models/task';
// import { collection, getDocs, getFirestore, onSnapshot, orderBy, query, where } from 'firebase/firestore';
// import React from 'react';

// export const TaskContext = React.createContext<{{UserTask[], any}}>({});

// export const useTaskContext = () => React.useContext(TaskContext);

// export const TaskContextProvider = ({
//     children,
// } : any) => {
//     const [taskList, setTaskList] = React.useState<UserTask[]>([]);
//     const [loading, setLoading] = React.useState(true);

//     const firestore = getFirestore(app);
//     const coll = collection(firestore, "tasks");
//     const q = query(coll, where("user_uid", "==", getCurrentUser()?.uid), orderBy("agenda_date", "desc"));

//     const fetchTasks = async () => {
//         const snapshot = await getDocs(q);

//         setTaskList(snapshot.docs.map<UserTask>((doc) => ({
//             id: doc.id,
//             title: doc.data()["title"],
//             description: doc.data()["description"],
//             status: doc.data()["status"],
//             agenda_date: doc.data()["agenda_date"].toDate(),
//             user_uid: getCurrentUser()!.uid,
//         })));
//     };

//     React.useEffect(() => {
//         fetchTasks();
//         const unsubscribe = onSnapshot(q, (doc) => {
//             if(doc.metadata.hasPendingWrites){
//                 const removedTask: string[] = [];
//                 doc.docChanges().forEach((change) => {
//                     console.log(change);
//                     if (change.type === "removed") {
//                         removedTask.push(change.doc.id);
//                     }
//                 });
//                 setTaskList(doc.docs.filter((doc) => !removedTask.includes(doc.id)).map<UserTask>((doc) => ({
//                     id: doc.id,
//                     title: doc.data()["title"],
//                     description: doc.data()["description"],
//                     status: doc.data()["status"],
//                     agenda_date: doc.data()["agenda_date"].toDate(),
//                     user_uid: getCurrentUser()!.uid,
//                 })));
//             }
//         });
//         setLoading(false);
//         return () => unsubscribe();
//     }, []);

//     return (
//         <TaskContext.Provider value={{taskList, fetchTasks}}>
//             {loading ? <></> : children}
//         </TaskContext.Provider>
//     );
// };