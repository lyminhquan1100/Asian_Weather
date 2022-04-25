const winDirConvert=(dir:any) => {
    switch (dir) {
        case "N":
            return "Bắc";
        case "NNE":
            return "BĐB";
        case "NE":
            return "ĐB";
        case "ENE":
            return "ĐĐB";
        case "E":
            return "Đông";
        case "ESE":
            return "ĐĐN";
        case "SE":
            return "ĐN";
        case "SSE":
            return "NĐN";
        case "S":
            return "Nam";
        case "SSW":
            return "NTN";
        case "SW":
            return "TN";
        case "WSW":
            return "TTN";
        case "W":
            return "Tây";
        case "WNW":
            return "TTB";
        case "NW":
            return "TTB";
        case "NNW":
            return "BTB";
        default:
            return null;
    }
 }
 export default winDirConvert;