// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";
import app from '../../firebase/firebase';
import { FirebaseApp } from 'firebase/app';

interface RequestData {
    id: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const body: RequestData = req.body
    if (req.method === 'POST') {
        // Process a POST request
        if (body.id == null) {
            return res.status(400).json(body.id);
        }

        const firestore = getFirestore(app as FirebaseApp);
        const documentData = doc(firestore, "tasks", body.id);
        const snapshot = await deleteDoc(documentData);
        
        return res.status(200).json('Success');
    } else {
        // Handle any other HTTP method
        return res.status(405).json('Method not allowed.');
    }
}
