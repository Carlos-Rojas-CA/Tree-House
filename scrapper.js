const puppeteer = require('puppeteer')
// const router = require('express').Router();
// const puppeteer = require('puppeteer')


//This isn't utilizing TypeScript, need to try to implement it at least or switch to JS.
//To Do: scrape bedrooms, sqft, available, description, map address, area.
//Hopefully: Use google maps to consolidate area listing.

async function scrapeData(url) {
    const brower = await puppeteer.launch();
    const page = await brower.newPage();
    await page.goto(url);
    const content = await page.content();

    //calls the scrapper based on the webite
    var site = url.split(".")[1].toLowerCase()
    switch (site) {
        case 'craigslist':
            return craigslist(brower, page, url)
            break;
        case 'zillow':
            console.log('zillow')
            break;
        default:
            console.log('default')
    }



}



//Checks if page has been deleted

async function craigslist(brower, page, url) {
    const [deleted] = await page.$x('/html/body/section/section/div/div[2]/h2')
    if (deleted != null) {
        const del = await deleted.getProperty('textContent')
        const delTxt = await del.jsonValue();
        if (delTxt.includes('deleted')) {
            const error = { error: "Deleted" }
            brower.close();
            console.log(error)
            return error
        }
    }

    //This gets the first image from craigslist. 
    const [el] = await page.$x('/html/body/section/section/section/figure/div[1]/div/div/div[1]/img')

    //If statement for no images
    if (!el) {

        const infoData = await craigslistTextData(page)
        brower.close();
        const craigslistData = {
            images: "No Pictures",
            title: infoData.title,
            price: infoData.price,
            bed: infoData.bed,
            bath: infoData.bath,
            location: infoData.location,
            address: infoData.address,
            website: url,
        }
        console.log(craigslistData)
        return craigslistData
    } else {             //Else statement if there are images.
        const src = await el.getProperty('src')
        const srcTxt = await src.jsonValue();
        const images = [srcTxt]


        const [imEl] = await page.$x('/html/body/section/section/section/figure/div[1]/span[2]')
        const numb = await imEl.getProperty('textContent')
        const numbTxt = await numb.jsonValue();
        const numberImgs = parseInt(numbTxt.split("of ").pop())
        const selector = "a[id^='2_thumb_']"


        //This gets the rest of the images if there are more than 1.
        if (numberImgs > 1) {
            const hoverEl = await page.hover(selector)  //This is necessary to active javascript on the page to load the picture/img tag under the divs
            for (let i = 2; i < numberImgs; i++) {
                let [imgEl] = await page.$x(`/html/body/section/section/section/figure/div[1]/div/div/div[${i}]/picture/img`)
                let src1 = await imgEl.getProperty('src')
                let srcTxt1 = await src1.jsonValue();
                images.push(srcTxt1)
            }
        }
        const infoData = await craigslistTextData(page)
        // console.log({ numberImgs, images, srcTxt, infoData })
        brower.close();
        const craigslistData = {
            images: images,
            title: infoData.title,
            price: infoData.price,
            bed: infoData.bed,
            bath: infoData.bath,
            location: infoData.location,
            address: infoData.address,
            website: url,
        }
        console.log(craigslistData)
        return craigslistData
    }


}


async function craigslistTextData(page) {

    let bed = '';
    let bath = '';
    let address = '';
    let location = '';
    let addressHyper = ''

    //This gets the title of the ad.
    const [el2] = await page.$x('//*[@id="titletextonly"]')
    const title = await el2.getProperty('textContent')
    const titleTxt = await title.jsonValue();

    //This gets the price of the ad.
    // /html/body/section/section/h2/span/span[2]
    const [el3] = await page.$x('//*[@class="price"]')
    const price = await el3.getProperty('textContent')
    const priceTxt = await price.jsonValue();
    const priceNum = parseInt(priceTxt.split("$").pop())  //In the case I want a number instead of a string.

    // Checks elements for bedroom number
    const [el4] = await page.$x("/html/body/section/section/section/div[1]/p[1]/span[1]/b[1]");
    if (el4 != null) {
        const bedEl = await el4.getProperty('textContent')
        const bedTxt = await bedEl.jsonValue();
        bed = parseInt(bedTxt.toLowerCase().split('br')[0])
    }

    // Checks elements for bathroom number
    const [el5] = await page.$x("/html/body/section/section/section/div[1]/p[1]/span[1]/b[2]");
    if (el5 != null) {
        const bathEl = await el5.getProperty('textContent')
        const bathTxt = await bathEl.jsonValue();
        bath = parseInt(bathTxt.split('Ba')[0]);
        // bath = bathTxt
    }

    const [el6] = await page.$x("/html/body/section/section/section/div[1]/div/div[2]")
    if (el6 != null) {
        const addressEl = await el6.getProperty('textContent')
        address = await addressEl.jsonValue();
    }

    const [el7] = await page.$x("/html/body/section/section/section/div[1]/div/p/small/a")
    if (el7 != null) {
        const addressHyperEl = await el7.getProperty('href')
        addressHyper = await addressHyperEl.jsonValue()
    }

    const [el8] = await page.$x("/html/body/section/section/h2/span/small")
    if (el8 != null) {
        const locationEl = await el8.getProperty('textContent')
        const locationText = await locationEl.jsonValue();
        location = locationText.split('(')[1].split(')')[0]
    }




    return { title: titleTxt, price: priceTxt, bed: bed, bath: bath, address: address, location: location, addressHyper: addressHyper }
}

// router.route("/")
//     .get(scrapeData(url))

module.exports = scrapeData
//  scrapeData;

// scrapeData("https://sandiego.craigslist.org/nsd/apa/d/escondido-top-floor-one-bedroom/7138810225.html")

// scrapeData('https://sandiego.craigslist.org/csd/apa/d/del-mar-cozy-house-4br2bath-in/7147529248.html')

//These are/were test sites on June 4th, 2020.

//Deleted
// scrapeData("https://sandiego.craigslist.org/nsd/apa/d/carlsbad-studio-1-ba-all-incl-beach/7134356372.html")

//Multiple Images
// scrapeData("https://sandiego.craigslist.org/csd/apa/d/san-diego-lovely-home-1bed-1bath/7118284488.html")

//No Images
// scrapeData("https://sandiego.craigslist.org/nsd/apa/d/escondido-escondido-home-with-view/7132792773.html")

//Only has 1 image
// scrapeData("https://sandiego.craigslist.org/csd/bks/d/disney-meet-the-cars-book-10-and/7127500690.html")