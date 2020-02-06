const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const BITLY_API_PATH = `${process.env.BITLY_API_PATH}/v4`;
let bitlyGroupGUID;

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
                            description: "BitlyAPI not ready yet",
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
                },
                body: JSON.stringify({
                    "group_guid": bitlyGroupGUID,
                    "domain": "bit.ly",
                    "long_url": url
                })
            })
                .then(response => {
                        throw new Error({
                            statusCode: response.statusCode,
                            body: response.json()
                        });

                    return response.json();
                })
                .then(body => {
                    const { link, long_url, created_at } = body;
                })

        })


    })

module.exports = {
    router,
}