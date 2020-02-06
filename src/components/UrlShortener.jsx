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
            if (!response.ok) throw response;

            return response.json();
        })
        .then(body => {
            setLink(body.link);
        })
        .catch(error => {
            //handle bad response
            error.json().then(body => {
                const {description, hint} = body.data
                alert(`${description}, ${hint}`);
            })
        })
    }


    return (
        <div className="urlshortener">
            <input type="text" className="text-longUrl" placeholder="Enter your long URL here!"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleOnUrlSubmit(document.querySelector(".text-longUrl").value);
                    }
                }
            />
            <br />
            <input type="button" value="Shorten Url!"
                onClick={(e) => handleOnUrlSubmit(document.querySelector(".text-longUrl").value)}
            />
            <br />
            <div className="urlshortener-result">
                {(
                    link ? (
                        <React.Fragment>
                            <span>{link}</span>
                            <br />
                            <div className="urlshortener-clipboard">
                                <CopyToClipboard text={link}
                                    onCopy={() => setCopiedLink(true)}>
                                    <button>Copy to Clipboard</button>
                                </CopyToClipboard>
                                {
                                    copiedLink ? <span>  Copied!</span> :
                                        false
                                }
                            </div>
                        </React.Fragment>

                    )
                        : false
                )}     
            </div>

        </div>
    )

}