import axios from '../axiosConfig'
import axiosDefault from 'axios'

export const apiGetPirces = () => new Promise(async (resovle, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/price/all'
        });
        resovle(response);
    } catch (error) {
        reject(error);
    }
})

export const apiGetAreas = () => new Promise(async (resovle, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/area/all'
        });
        resovle(response);
    } catch (error) {
        reject(error);
    }
})

export const apiGetProvinces = () => new Promise(async (resovle, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/v1/province/all'
        });
        resovle(response);
    } catch (error) {
        reject(error);
    }
})

export const apiGetPublicProvinces = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosDefault({
            method: 'get',
            url: 'https://vapi.vnappmob.com/api/province/'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetPublicDistrict = (provinceId) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosDefault({
            method: 'get',
            url: `https://vapi.vnappmob.com/api/province/district/${provinceId}`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})