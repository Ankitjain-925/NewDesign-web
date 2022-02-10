import React,{useState} from 'react'; 
import{Container ,Card , CardContent, makeStyles ,Grid} from '@material-ui/core';
import QrReader from 'react-qr-reader'

function App() {
  const[scanResultWebcam,setScanResultWebCam]= useState('');
  const classes =useStyles();
  

  const handleErrorWebCam=(error)=>{
    console.log(error);
  }
  const handleScanWebCam=(result)=>{
    if(result){
      setScanResultWebCam(result);
    }
  }
  return (
    <Container className={classes.container}>
 <Card>
   <CardContent>
     <Grid container spacing ={2}>
      <Grid item xl={4} lg ={4} sm ={12} xs={12}>
         <h3> Qr_Code_scan_by_Web_cam</h3>
         <QrReader
         delay={300}
         style={{width:'100%'}}
         onError={handleErrorWebCam}
         onScan={handleScanWebCam}
         
         />
         <h3>Scanned By Webcam Code :{scanResultWebcam}</h3>
       </Grid>

     </Grid>
   </CardContent>

 </Card>


    </Container>
  );
}
const useStyles =makeStyles((theme)=>({
container:{
  marginTop:10
},
title:{
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  background:'#3f51b5',
  color:'#fff',
  padding:20
},
btn:{
  marginTop:10,
  marginBottom:20
}
}));
export default App;
