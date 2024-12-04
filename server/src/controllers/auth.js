import * as authService from '../services/auth'



export const register = async (req, res) => {
    const { name, phone, password } = req.body
    try {
        if (!name || !phone || !password) {
            return res.status(400).json({
                err: -1,
                msg: 'Missing input !'
            })
        }
        const response = await authService.registerService(req.body)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controllers' + error
        })
    }
}

export const login = async (req, res) => {
    const { phone, password } = req.body;
    try {
        // Kiểm tra nếu thiếu input
        if (!phone || !password) {
            return res.status(400).json({
                err: -1,
                msg: 'Missing input!'
            });
        }

        // Gọi loginService để xử lý logic đăng nhập
        const response = await authService.loginService(req.body);
        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controllers: ' + error
        });
    }
};