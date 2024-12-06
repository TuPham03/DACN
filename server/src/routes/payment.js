import express from 'express'
import { VNPay, ignoreLogger, ProductCode, VnpLocale, dateFormat } from 'vnpay';
import db from "../models";

import verifyToken from '../middlewares/verifyToken'
const router = express.Router()

const vnpay = new VNPay({
    tmnCode: 'M43K3FNL',
    secureSecret: 'P46FZGMZ29B7IYPQSNZURF6RVEJ54UPM',
    vnpayHost: 'https://sandbox.vnpayment.vn',
    testMode: true, // tùy chọn
    hashAlgorithm: 'SHA512', // tùy chọn
    enableLog: true, // tùy chọn
    loggerFn: ignoreLogger, // tùy chọn
});

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

//router.use(verifyToken)
router.get('/test', async (req, res) => {
    //const { id } = req.user
    console.log(req.query);

    let vnd = req.query.vnd;
    let uid = req.query.uid;

    if(vnd === undefined || uid === undefined) {
        return res.status(200).json({
            error : true,
            msg: "parma"
        })
    }

    let idRquest = getRndInteger(100000,999999);

    // id	uid	requestid	vnd	status	createdAt	updatedAt	

    await db.payment.create({
        requestid: idRquest,
        uid: uid,
        vnd: vnd,
        status: "-1",
      });


    const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const paymentUrl = vnpay.buildPaymentUrl({
    vnp_Amount: vnd,
    vnp_IpAddr: '13.160.92.202',
    vnp_TxnRef: idRquest,
    vnp_OrderInfo: 'thue tro test id'+getRndInteger(100000,999999),
    vnp_OrderType: ProductCode.Other,
    vnp_ReturnUrl: 'http://localhost:5000/api/v1/payment/result',
    vnp_Locale: VnpLocale.VN, // 'vn' hoặc 'en'
    vnp_CreateDate: dateFormat(new Date()), // tùy chọn, mặc định là hiện tại
    vnp_ExpireDate: dateFormat(tomorrow), // tùy chọn
});

    return res.status(200).json({
        t : 1,
        error : false,
        url: paymentUrl,
    })

})


// xu li nhan tien tu vnpay
router.get('/result', async (req, res) => {
    //const { id } = req.user
    console.log(req.query);


    let status = req.query.vnp_TransactionStatus;
    let requestid = req.query.vnp_TxnRef;
    
    let check = await db.payment.findOne({
        where : {
            status : "-1",
            requestid : requestid,
        }
    });
    if(!check) {
        // ko ton tai hoac da thanh toan r
        return res.status(200).json({
            error : true,
            msg: "not found"
        })
    }

    await db.payment.update({
        status: status,
      }, {
        where: {
            requestid: requestid,
        }
    });

    if(status === '00') {
        // thanh cong + cong tien
        let vnd = check.vnd; // 50k +60%,...

        let uid = check.uid; // uid day

        // viết thêm đoạn lấy thông tin user với Id = uid và cộng tiền từ biến vnd

        //// viet o day



         res.status(200).redirect('http://localhost'); // URL bạn muốn chuyển hướng tới

    }

    // chuyen huong den trang xu li loi
    return res.status(200).json({
        t : 1,
        url: "",
    })

})


export default router