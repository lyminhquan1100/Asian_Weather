
 const aqiNumberToString=(indexEpaVI:any) => {
    switch (indexEpaVI) {
        case 1:
            return "Tốt";
        case 2:
            return "Trung bình";
        case 3:
            return "Kém";
        case 4:
            return "Xấu";
        case 5:
            return "Rất xấu";
        case 6:
            return "Nguy hại";
        default:
            return null;
    }
   
}
const aqiIndexDetail=(indexEpaVI:any) => {
     switch (indexEpaVI) {
         case 1:
             return "Chất lượng không khí được cho là thỏa đáng, ô nhiếm không khí đem lại rất ít hoặc không có rủi ro nào.";
         case 2:
             return "Chất lượng không khí chấp nhận được; tuy nhiên, đối với một số chất gây ô nhiễm, có thể gây lo ngại cho 1 nhóm rất nhỏ những người đặc biệt nhạy cảm với ô nhiễm không khí .";
         case 3:
             return "Những người thuộc nhóm nhạy cảm có thể bị ảnh hưởng về sức khỏe. Công chúng nói chung có thể không bị ảnh hưởng.";
         case 4:
             return "Mọi người bắt đầu bị tác động về sức khỏe; những người thuộc nhóm nhạy cảm có thể gặp phải những tác động sức khỏe nghiêm trọng hơn.";
         case 5:
             return "Cảnh báo về tình trạng khẩn cấp liên quan tới sức khỏe. Tất cả mọi người đều có thể bị ảnh hưởng.";
         case 6:
             return "Báo động về sức khỏe: Tất cả mọi người đều có thể bị ảnh hưởng nghiêm trọng về sức khỏe.";
         default:
             return null;
     }
    
 }
 
export default  {aqiNumberToString,aqiIndexDetail};