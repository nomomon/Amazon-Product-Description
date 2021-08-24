const puppeteer = require('puppeteer');
const fs = require('fs');

const itemUrls = require('./links_3')

const openSearchUrl = async (page, url) => {
    await page.goto(url, { waitUntil: 'networkidle0' })
}

const getProductData = async (page) => {
    return await page.evaluate(async () => {
        o = {
            description:"",
            bulletpoints:"",
            category:""
        }
        
        bread = document.querySelector("#wayfinding-breadcrumbs_feature_div, #wayfinding-breadcrumbs_container")
        title = document.querySelector('#title')
        bullets = document.querySelector('#feature-bullets')
        short1 = document.querySelector("#productDetails_detailBullets_sections1")
        short2 = document.querySelector("#product-specification-table")
        short3 = document.querySelector("#tech")
        descriptions = document.querySelectorAll("#productDescription > p")

        o.category = (bread)?bread.innerText.replace(/\n/g, '').replace(/›/g, ' > '):""
        o.title = title && title.innerText
        o.bulletpoints = [...(bullets)?(bullets.querySelectorAll("li")):[]]
        .filter(el => !(el.classList.value.indexOf("hidden") + 1))
        .map(el => (el) ? el.innerText : "").join("\n- ")
        
    
        o.short = short1 || short2
                    
        if(o.short)
            o.short = [...o.short.querySelectorAll("td")]
                    .map(el => (el) ? el.innerText : "").join(", ").split("\n").join(" ")
        else
            o.short = ""

        if(short3){
            o.short += [...short3.querySelectorAll("table")].map(table => {
                            return [...table.querySelectorAll("td")]
                                    .map(el => el.innerText)
                                    .filter((td, i) => i%2 == 1)
                                    .join(", ")
                        }).join(", ")
        }


        
        o.description = [...descriptions]
                        .map(el => (el) ? el.innerText : "").join("\n")

        return o
    })
}

const parseAmazon = async () => {
    const browser = await puppeteer.launch({ 
        headless: false
    });
    const page = await browser.newPage(); 

    await page.setViewport({width: 1200, height: 720});
    
    for(let i = 109; i < itemUrls.length; i++){
        url = itemUrls[i]
        
        await openSearchUrl(page, url)
        
        data = await getProductData(page).catch((err)=>{
            console.error(err)
            return {
                "category":"", "title":"", "short":"", "bulletpoints":"", "description":""
            }
        })
        
        condit = false

        keys = ["category", "title", "short"]
        keys = keys.forEach(key => {condit = condit || data[key] == ""})
        
        if(condit) continue

        promptFromData = ""
        if(data.description.length != 0)
        promptFromData += `<|endoftext|>
Category: ${data.category}
Short description: ${data.short}
Title: ${data.title}
Description: ${data.description}
<|endoftext|>`
    
        if(data.bulletpoints.length != 0)
        promptFromData += `<|endoftext|>
Category: ${data.category}
Short description: ${data.short}
Title: ${data.title}
Bulletpoints: 
- ${data.bulletpoints}
<|endoftext|>`

        fs.appendFile('train.txt', promptFromData, function (err) {
            if (err) throw err;
        });

        console.log(`went through ${i} items, ${itemUrls.length - i} left`)
        
    }

    await browser.close();
}

parseAmazon()
.catch((err) => {
    console.log(err)
})