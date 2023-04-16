// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import app from '../../firebase/firebase';
import { collection, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { getCurrentUser } from '@/firebase/firebase_auth';
// import { getAuth } from 'firebase/auth';

type ListData = {
  datas?: Array<Data>
}

type Data = {
  id: String,
  title : String,
  description: String,
  created_date: Date,
  agenda_date: Date,
  status: String,
}

interface RequestBody {
  user_uid: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListData>
) {
  // const authHeader = req.headers.authorization;
  // if (!authHeader) {
  //   return res.status(401).end('Not authenticated. No Auth header');
  // }
  // if (!getCurrentUser()) {
    // return res.status(401).end('Not authenticated. No Auth header');
  // }
  const body: RequestBody = req.body;
  if (req.method !== 'POST') {
    // Handle any other HTTP method
    return res.status(405).end("Wrong method.");
  }
  if (body.user_uid == null) {
    return res.status(405).end('Please provide user_uid');
  }

  const firestore = getFirestore(app);
  const col = collection(firestore, "tasks");
  const q = query(col, where("user_uid", "==", body.user_uid));
  
  const data = (await getDocs(q)).docs.map<Data>((doc) => ({
    id: doc.id,
    title: doc.data()["title"],
    description: doc.data()["description"],
    status: doc.data()["status"],
    agenda_date: doc.data()["agenda_date"],
    created_date: doc.data()["created_date"],
  }));
  
  // res.status(200).json({datas: data})
  return res.status(200).json({datas: data});
}
