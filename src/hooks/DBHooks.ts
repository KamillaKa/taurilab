import { useEffect, useState } from "react"
import Loki from 'lokijs';
import { Vote } from "@/types/localTypes";

const useDB = () => {
    const [db, setDB] = useState<Loki | null>(null);
    const [faceCollection, setFaceCollection] = useState<Loki.Collection<Float32Array> | null>(null);
    const [voteCollection, setVoteCollection] = useState<Loki.Collection<Vote> | null>(null);

    useEffect(() => {
        try {
            const dbInstance = new Loki('1.json', {
                persistenceMethod: 'fs',
            });

            // Load Database if it exists
            dbInstance.loadDatabase({}, () => {
                // Create a collection of documents
                const faces = dbInstance.getCollection<Float32Array>('faces') || dbInstance.addCollection('faces');
                const votes = dbInstance.getCollection<Vote>('votes') || dbInstance.addCollection('votes');
            });
        } catch (error) {
            console.log('Error initializing database:', error);
        }
    }, [])
};