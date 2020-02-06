const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const BITLY_API_PATH = `${process.env.BITLY_API_PATH}/v4`;
const {BITLY_API_TOKEN} = process.env;
let bitlyGroupGUID;

fetch(`${BITLY_API_PATH}/groups`, {
    headers:{
        'Authorization': `Bearer ${BITLY_API_TOKEN}`
    }
})
    .then(response => response.json())
    .then(body => {
        if (body.groups && body.groups.length)
            bitlyGroupGUID = body.groups[0].guid;

        router.use('/', (req, res, next) => {
            if (!bitlyGroupGUID) {
                res
                    .status(500)
                    .json({
                        data: {
                            description: "shortener API not ready yet",
                            hint: "Try again later"
                        }
                    })
            }

            next();
        })

        router.post('/shorten', (req, res, next) => {
            const { url } = req.body;

            try {
                new URL(url);
            } catch (error) {
                res
                    .status(400)
                    .json({
                        data: {
                            description: "Invalid URL provided",
                            hint: "Please make sure url is a fully qualified url, e.g. https://www.example.com"
                        }
                    });
                return;
            }

            fetch(`${BITLY_API_PATH}/shorten`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${BITLY_API_TOKEN}`
                },
                body: JSON.stringify({
                    "group_guid": bitlyGroupGUID,
                    "domain": "bit.ly",
                    "long_url": url
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error({
                            statusCode: response.statusCode,
                            body: response.json()
                        });
                    }

                    return response.json();
                })
                .then(body => {
                    const { link, long_url, created_at } = body;
                    return res.json({ link, long_url, created_at });
                })
                .catch(next)

        })


    })

module.exports = {
    router,
}