const timeout = 99999

describe("Shorten Anonymous", () => {
    let page


    test('private personalized shorten', async () => {

        await page.goto('http://polr.campus-grenoble.fr')

        // step 1
        await page.waitForSelector('.long-link-input')
        await page.type('.long-link-input', 'https://github.com/Radic4l/polr');
        await page.screenshot({path: './tests/img/step1.png'});

        // step 2
        await page.waitForSelector('#show-link-options')
        await page.$eval('#show-link-options', el => el.click())
        await page.screenshot({path:'./tests/img/step2.png'})


        await page.waitForSelector('input[value=s]')
        await page.$eval('input[value=s]', el => el.click())
        await page.screenshot({path: './tests/img/step3.png'})

        // step 8
        await page.waitForSelector('#shorten')
        await page.$eval( '#shorten', el => el.click() );
        await page.waitForSelector('#short_url')
        const val = await page.$eval('#short_url', el => el.value)
        expect(val).toMatch(/^http:\/\/polr\.campus\-grenoble\.fr\/[0-9]+/)
        await page.screenshot({path: './tests/img/private-personalized-shorten2.png'});
        await page.goto(val)
        await page.screenshot({path: './tests/img/gotogit.jpeg',fullPage: true })
    }, timeout)


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

})
