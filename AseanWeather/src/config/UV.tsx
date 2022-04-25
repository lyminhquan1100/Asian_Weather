
const UVConvert=(index:any) => {
    if(0 <= index && index <=2){
        return "Thấp"
    }
    else if(3 <= index && index <=5){
        return "Trung bình"
    }
    else if(6 <= index && index <=7){
        return "Cao"
    }
    else if(8 <= index && index <=10){
        return "Rất cao"
    }
    else if(index>=11){
        return "Nguy hiểm"
    }
   
}

export default UVConvert;