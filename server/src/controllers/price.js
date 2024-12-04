import * as services from "../services/price";

export const getPirces = async (req, res) => {
    try {
        const response = await services.getPircesService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Failed at category controller: " + error,
        });
    }
};
