import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const API_LINK = `/api/v1`
export const UrlShortener = (props) => {
    const [long_url, setUrl] = useState();
    const [link, setLink] = useState();
    const [copiedLink, setCopiedLink] = useState(false);

    const handleOnUrlSubmit = (url) => {
        //API call here
        fetch(`${API_LINK}/shorten`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.json());
                }

                return response.json();
            })
            .then(body => {
                //change Urls state
                console.log(body);
                setLink(body.link);
            })
            .catch(error => {
                //handle bad response
            })
            .finally(() => {
                //clean up UI
            })
    }


    return (
        <div className="urlshortener">
            <input type="text" className="text-longUrl" placeholder="Enter your long URL here!" />
            <br />
            <input type="button" onClick={(e) => handleOnUrlSubmit(document.querySelector(".text-longUrl").value)} value="Shorten Url!" />
            <br />
            <div>
                {(
                    link ? (
                        <React.Fragment>
                            <span>{link}</span>
                            <CopyToClipboard text={link}
                                onCopy={() => setCopiedLink(true)}>
                                <button>Copy to Clipboard</button>
                            </CopyToClipboard>
                        </React.Fragment>

                    )
                        : false
                )}
                {
                    copiedLink ? <span>Copied!</span> :
                        false
                }
            </div>

        </div>
    )

}