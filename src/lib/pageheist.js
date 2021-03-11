// Tools for understanding an opaque environment (i.e. The app)
// Usage: stash(document.documentElement.outerHTML, "document.html", "application/html")
//        stash(window.ArcP._facts, "arcp_facts.json", "application/json")
import AWS from "aws-sdk"
const BUCKET = "s3.newsapps.nz"
const PATH = "apps/common/pageheist/stash"
const IDENTITY_POOL = "ap-southeast-2:9f69b311-9ce1-4b5e-8654-8fd6b7509420"

function pageHeist (payload, fn, contentType, loud) {
    AWS.config.region = "ap-southeast-2"
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({ "IdentityPoolId": IDENTITY_POOL })
    AWS.config.credentials.get(function(err) {
        if (err && loud) alert(err)
        console.log(AWS.config.credentials)
    })
    if (typeof payload != "string") payload = JSON.stringify(payload)

    const s3 = new AWS.S3({
        apiVersion: "2006-03-01",
        params: {
            Bucket: BUCKET,
            CacheControl: "max-age=2,public",
            ACL: "public-read"
        }
    })
    s3.upload({
        Key: `${PATH}/${fn}`,
        Body: payload,
        ContentType: contentType
    }, (err, data) => {
        if (err) {
            console.error(err)
            if (loud) alert("Something went wrong:", err)
        }
        else {
            console.log("Uploaded:", data.Location)
        }
    })
}

export default pageHeist
