'use client'
import { Box, Typography, Modal, Stack, Paper, TextField, Button, Container, Grid, Divider } from '@mui/material';
import Image from 'next/image';
import firebase from '@/firebase';
import { useState, useEffect, useMemo } from 'react';
import { firestore, storage } from '@/firebase';
import {collection, query, getDoc, getDocs, setDoc, doc, deleteDoc} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ItemList from './components/itemList';
import ModalComponent from './components/modalComponent';
import SearchBar from './components/searchBar';
import SortSelect from './components/sortSelect';


export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot);

    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList);
    console.log('Inventory List:', inventoryList);
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }

    await updateInventory();
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }

    await updateInventory();
  }

  // file uploads (pictures) 
  const handleUpload = async (files, itemName) => {
    try {
      const filePromises = files.map(async (file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        console.log(`Uploaded ${file.name} to ${url}`); // Debugging log
        return {
          name: file.name,
          url,
        };
      });

      const uploadedFiles = await Promise.all(filePromises);
      console.log('Uploaded files:', uploadedFiles); // Debugging log

      // store metadata in firestore
      await setDoc(doc(collection(firestore, 'inventory'), itemName), {
        name: itemName,
        images: uploadedFiles,
        quantity: 1, 
        createdAt: new Date(),
      }, {merge: true});

      console.log('files uploaded & metadata stored success!!');

      setSelectedFiles([]); // reset selected files after upload
      setItemName('');
      setOpen(false); // close modal after successful upload
      await updateInventory();

    } catch(err) {
      console.error('Error uploading files', err)
    }
  }

  useEffect(() => {
    updateInventory();
  }, [])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredInventory = useMemo(() => {
    return inventory.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [inventory, searchQuery]);

  const sortedFilteredInventory = useMemo(() => {
    return filteredInventory.sort((a,b) => {
      switch(sortOrder) {
        case 'name_asc':
          return a.name.localeCompare(b.name);
        case 'name_desc':
          return b.name.localeCompare(a.name);
        case 'quantity_asc':
          return a.quantity - b.quantity;
        case 'quantity_desc':
          return b.quantity - a.quantity;
      }
    });
  }, [filteredInventory, sortOrder])

  return (
    <Container sx={{ py: 5, height: "110vh"}}>
      {/* app title */}
      <Grid container direction="column" spacing={4} justifyContent="center" alignItems="center">
        <Grid item>
          <Typography variant="h2" color="#333" p={2} textAlign="center">
            🧳 Inventory Manager 🧳
          </Typography>
        </Grid>
        <Divider variant="middle" sx={{width:'65%'}} />
        <Grid item> 
          <Box sx={{ height: 25 }}> </Box>
        </Grid>
      </Grid>

      {/* modal */}
      <ModalComponent open={open} handleClose={handleClose} itemName={itemName} 
        setItemName={setItemName} addItem={addItem} handleUpload={handleUpload}
        setSelectedFiles={setSelectedFiles}
      />

      <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center">
        {/* add new item button */}
        <Grid item xs={12} sx={{mb:4}}>
          <Button variant="contained" onClick={() => handleOpen()}> Add New Item </Button>
        </Grid>

        <Grid container spacing={4} justifyContent="center" alignItems="center">
          <Grid item xs={6} display="flex" justifyContent="flex-end">
            {/* sort by form */}
            <SortSelect sortOrder={sortOrder} setSortOrder={setSortOrder}/>
          </Grid>
          <Grid item xs={6} display="flex" justifyContent="flex-start">
            {/* search items bar */}
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
          </Grid>
        </Grid>
      </Grid>

      
      <Grid container spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{ mt: 4 }} >
        <Grid item xs={12}>
          <Typography variant="h4" p={2} color="#333">Inventory Items</Typography>
        </Grid>

        <Divider variant="middle" sx={{ width: '65%' }} />

        <ItemList inventory={sortedFilteredInventory} addItem={addItem} removeItem={removeItem}/>
      
      </Grid>

    </Container>
  );

}