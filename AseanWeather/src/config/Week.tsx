const weekConvert=(day:any) => {

    var date=new Date(day)
    // Lấy số thứ tự của ngày hiện tại
     var current_day = date.getDay();
    
    // Lấy tên thứ của ngày hiện tại
    switch (current_day) {
        case 0:
            return "Sunday";
        case 1:
           return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        }
   
}

export default weekConvert;