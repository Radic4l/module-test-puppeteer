const timeout = 99999

describe("Shorten Anonymous", () => {
    let page

    test('private personalized shorten', async () => {

        await page.goto('http://polr.campus-grenoble.fr')

        // step 1 : insert un url
        await page.waitForSelector('.long-link-input')
        await page.type('.long-link-input', 'https://github.com/Radic4l/polr')
        await page.screenshot({path: './tests/img/step1.png',fullPage: true})

        // step 2 : clique sur Link options
        await page.waitForSelector('#show-link-options')
        await page.$eval('#show-link-options', el => el.click())
        await page.screenshot({path:'./tests/img/step2.png',fullPage: true})

        // step 3 : clique sur le toggle button pour passer en secret
        await page.waitForSelector('input[value=s]')
        await page.$eval('input[value=s]', el => el.click())
        await page.screenshot({path: './tests/img/step3.png'})

        // step 4 : insert un lien
        await page.waitForSelector('input[name=custom-ending]')
        const random = Math.random().toString(36).replace('0.', '')
        await page.type('input[name=custom-ending]', "Radical-" + random)
        const persVal = await page.$eval('input[name=custom-ending]', el => el.value)
        await page.screenshot({path:'./tests/img/step4.png',fullPage: true})

        // step 5 : check link available
        await page.waitForSelector('#check-link-availability')
        await page.$eval('#check-link-availability', el => el.click())
        await page.waitForSelector('#link-availability-status span');
        await  page.waitFor(1000);
        const availableTest = await page.$eval('#link-availability-status span', _ => _.innerText);
        expect(availableTest).toContain("Available")
        await page.screenshot({path: './tests/img/step5.jpeg',fullPage: true})


        // step 6 : generate Short Link
        await page.waitForSelector('#shorten')
        await page.$eval( '#shorten', el => el.click() )
        await page.waitForSelector('#short_url')
        const val = await page.$eval('#short_url', el => el.value)
        let re = new RegExp("^http:\/\/polr.campus-grenoble\.fr\/"+ persVal +"\/[0-9a-zA-Z]+")
        expect(val).toMatch(re)
        await page.screenshot({path: './tests/img/step6.jpeg',fullPage: true})

        // step 7 : use ShortLink
        await page.goto(val)
        await page.screenshot({path: './tests/img/step7.jpeg',fullPage: true })
    }, timeout)


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

})
