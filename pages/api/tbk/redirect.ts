import { NextApiRequest, NextApiResponse } from "next"
import axios from 'axios'
import * as Nunjucks from 'nunjucks'

export default async function TbkRedirect(request:NextApiRequest, response:NextApiResponse) {
    const axionsInstance = axios.create({
        baseURL: 'https://webpay3gint.transbank.cl',
        headers: {
            'Tbk-Api-Key-Id': '597055555532',
            'Tbk-Api-Key-Secret': '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C',
            'Content-Type': 'application/json'
        }
    })

    const path  = '/rswebpaytransaction/api/webpay/v1.0/transactions'
    const data  = {
        "buy_order":    "ordenCompra12345678",
        "session_id":   "sesion1234557545",
        "amount":       10000,
        "return_url":   "http://www.lakis.cl/"
    }
    const res   = await axionsInstance.post(path, data)

    const nunjucks = Nunjucks.configure('views', {autoescape: true})
    const template = 'tbk-redirect.html'
    const params = {
        form_action: res?.data?.url,
        token_ws: res?.data?.token
    }
    const html = nunjucks.render(template, params)
    return response.send( html )
}