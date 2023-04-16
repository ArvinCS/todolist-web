// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import app from '../../firebase/firebase';
import { FirebaseApp } from 'firebase/app';

interface RequestData {
  id: string,
  title?: string,
  description?: string,
  created_date?: Date,
  agenda_date?: Date,
  status?: string,
}

export default async function handler(
    req: NextApiRequest, 
    res: NextApiResponse,
) {
    const body: RequestData = req.body
    if (req.method === 'POST') {
        // Process a POST request
        if (body.id == null) {
          return res.status(400).json('ID must be filled.');
        }
        
        var data: any = {};
        if(body.title != null){
          data['title'] = body.title;
        }
        if(body.description != null){
          data['description'] = body.description;
        }
        if(body.status != null){
          data['status'] = body.status;
        }
        if(body.agenda_date != null){
          data['agenda_date'] = body.agenda_date;
        }
        if(body.created_date != null){
          data['created_date'] = body.created_date;
        }

        const firestore = getFirestore(app as FirebaseApp);
        const documentData = doc(firestore, "tasks", body.id);
        const snapshot = await updateDoc(documentData, data);
        
        return res.status(200).json(data);
    } else {
      // Handle any other HTTP method
      return res.status(405).json('Method not allowed.');
    }
}