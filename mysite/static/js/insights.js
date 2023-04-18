const sectNames = document.querySelectorAll('.sect_names');
const pictureTitle = document.querySelector('.sector_title');

const sectorImage = document.getElementById('sector_image');

const priceEarnings = document.getElementById('price_earnings_forward');
const priceSales = document.getElementById('price_sales_forward');
const priceBook = document.getElementById('price_book_mrq');
const priceCashFlow = document.getElementById('price_cashflow');
const dateCreated = document.getElementById('as_of_date');

// UPDATES SECTOR TITLE ONCE SECTOR IS CHOSEN
const updateTitle = (sector) => {
    if (sector === undefined) {
        sectNames.forEach(sect => {
            sect.addEventListener('click', function(){
                pictureTitle.innerHTML = sect.innerHTML;
            })
        })
    } else {
        pictureTitle.innerHTML = sector;
    }
   
}

// SETS DEFAULT STATS AND IMAGE ON PAGE LOAD SO THAT DIVS AREN'T EMPTY
const setStatsInPic = () => {
    the_weekly_stats.filter((tats) => {
        if (tats['fields']['sector_name'] == 3){
            pictureTitle.innerHTML = "Communication Services"
            priceEarnings.innerHTML = tats['fields']['forward_pe'] + 'x'
            priceSales.innerHTML = tats['fields']['forward_ps'] + 'x'
            priceBook.innerHTML = tats['fields']['mrq_pb'] + 'x'
            priceCashFlow.innerHTML = tats['fields']['pcf'] + 'x'

            let getDate = tats['fields']['date_created'].split('T')
            let splitDate = getDate[0].split('-')
            dateCreated.innerHTML = `${splitDate[1]}-${splitDate[2]}-${splitDate[0]}`
        }
    })

    the_sector_names.filter(image => {
        if (image['pk'] === 3){
            sectorImage.src = 'media/' + image['fields']['sector_image'];

        }
    })
}

// PROVIDES SECTOR ID |  SECTOR ID IS LINKED TO SECTOR NAME
const getSectorId = () => {
    let sectorInPlay;
    sectNames.forEach(id => {
        id.addEventListener("click", function() {
            let titleID = id.innerHTML
            console.log('titleID', titleID)
            switch (titleID){
                case "Energy":
                    sectorInPlay = 1;
                    break
                case "Consumer Discretionary":
                    sectorInPlay = 2;
                    break;
                case "Communication Services":
                    sectorInPlay = 3;
                    break
                case "Consumer Staples":
                    sectorInPlay = 4;
                    break
                case "Finance":
                    sectorInPlay = 5;
                    break
                case "Healthcare":
                    sectorInPlay = 6;
                    break
                case "Industrial":
                    sectorInPlay = 7;
                    break
                case "Information Technology":
                    sectorInPlay = 8;
                    break
                case "Materials":
                    sectorInPlay = 9;
                    break
                case "Real Estate":
                    sectorInPlay = 10;
                    break
                case "Utilities":
                    sectorInPlay = 11;
                    break
            }
            statUpdate(sectorInPlay);
            updateImage(sectorInPlay)
        })
    })
}

// DISPLAYS SECTOR STATS ON IMAGE WHEN USER SELECTS SECTOR
const statUpdate = (sectorInPlay) => {
    the_weekly_stats.forEach(stats => {
        if (stats['fields']['sector_name'] === sectorInPlay){
            priceEarnings.innerHTML = stats['fields']['forward_pe'] + 'x'
            priceSales.innerHTML = stats['fields']['forward_ps'] + 'x'
            priceBook.innerHTML = stats['fields']['mrq_pb'] + 'x'
            priceCashFlow.innerHTML = stats['fields']['pcf'] + 'x'

            let getDate = stats['fields']['date_created'].split('T')
            let splitDate = getDate[0].split('-')
            dateCreated.innerHTML = `${splitDate[1]}-${splitDate[2]}-${splitDate[0]}`
        }
    })
}

// UPDATES THE IMAGE THAT IS ASSIGNED TO THE SECTOR NAME
const updateImage = (sectorInPlay) => {
    the_sector_names.filter(image => {
        if (image['pk'] === sectorInPlay){
            sectorImage.src = 'media/' + image['fields']['sector_image'];

        }
    })
}


// CHANGES SECTOR NAME, STATS, AND IMAGE AFTER 60 SECONDS
const carouselStats = () => {
    let selectedSectorName;
    let lastRandomNum;
    const namesOfSector = [
        { name: 'Communication Services', index: 3 }, { name: 'Consumer Discretionary', index: 2 },
        { name: 'Consumer Staples', index: 4 }, {name: 'Energy', index: 1}, 
        {name: 'Finance', index: 5}, {name: 'Healthcare', index: 6}, {name: 'Industrial', index: 7}, 
        {name: 'Information Technology', index: 8, }, {name: 'Materials', index: 9}, 
        {name:'Real Estate', index: 10}, {name: 'Utilities', index: 11 }
    ]
    
        const random = Math.floor(Math.random() * namesOfSector.length)
        
        if (lastRandomNum != random){
            namesOfSector.filter(names => {
                if (names.index === random){
                    selectedSectorName = names.name
                }
            })
        } else {
            const random = Math.floor(Math.random() * namesOfSector.length)
        }
       
    updateTitle(selectedSectorName)
    statUpdate(random)
    updateImage(random)
    lastRandomNum = random;  
}


setInterval(carouselStats,  35000);
setStatsInPic()
updateTitle()
getSectorId()


