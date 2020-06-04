const puppeteer = require('puppeteer')

//This isn't utilizing TypeScript, need to try to implement it at least or switch to JS.
//To Do: scrape bedrooms, sqft, available, description, map address, area.
//Hopefully: Use google maps to consolidate area listing.

async function scrapeData(url) {
    const brower = await puppeteer.launch();
    const page = await brower.newPage();
    await page.goto(url);
    const content = await page.content();



    //Checks if page has been deleted
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

        const titleAndPrice = await textData(page)
        brower.close();
        const craigslistData = { images: "No Pictures", title: titleAndPrice.title, price: titleAndPrice.price }
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
        const titleAndPrice = await textData(page)
        // console.log({ numberImgs, images, srcTxt, titleAndPrice })
        brower.close();
        const craigslistData = { images: images, title: titleAndPrice.title, price: titleAndPrice.price }
        console.log(craigslistData)
        return craigslistData
    }


}

async function textData(page) {
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
    return { title: titleTxt, price: priceTxt }
}

module.exports = scrapeData;


//These are/were test sites on June 4th, 2020.

//Deleted
// scrapeData("https://sandiego.craigslist.org/nsd/apa/d/carlsbad-studio-1-ba-all-incl-beach/7134356372.html")

//Multiple Images
// scrapeData("https://sandiego.craigslist.org/csd/apa/d/san-diego-lovely-home-1bed-1bath/7118284488.html")

//No Images
// scrapeData("https://sandiego.craigslist.org/nsd/apa/d/escondido-escondido-home-with-view/7132792773.html")

//Only has 1 image
// scrapeData("https://sandiego.craigslist.org/csd/bks/d/disney-meet-the-cars-book-10-and/7127500690.html")