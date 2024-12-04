import moment from 'moment';

const formatDate = (timeObj) => {
    // Xác định thứ trong tuần, nếu là Chủ nhật thì đặt là "Chủ nhật", ngược lại sẽ là "Thứ" + (số ngày + 1)
    let day = timeObj.getDay() === 0 ? 'Chủ nhật' : `Thứ ${timeObj.getDay() + 1}`;
    // Lấy ngày tháng năm theo định dạng ngày/tháng/năm
    let date = `${timeObj.getDate()}/${timeObj.getMonth() + 1}/${timeObj.getFullYear()}`;
    // Lấy giờ và phút hiện tại theo định dạng giờ:phút
    let time = `${timeObj.getHours()}:${timeObj.getMinutes()}`;

    return `${day} ${time} ${date}`;
};

const generateDate = () => {
    // Tạo khoảng thời gian hết hạn ngẫu nhiên từ 1 đến 29 ngày
    let gapExpire = Math.floor(Math.random() * 29) + 1;
    let today = new Date();
    // Tính ngày hết hạn bằng cách cộng số ngày ngẫu nhiên vào ngày hiện tại
    let expireDay = moment(today).add(gapExpire, 'd').toDate();
    return {
        today: formatDate(today),
        expireDay: formatDate(expireDay)
    };
};
export default generateDate;
