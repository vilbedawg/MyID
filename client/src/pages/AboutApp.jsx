import TextBlockLeft from "../components/TextBlockLeft";
import TextBlockRight from "../components/TextBlockRight";
import { useNavigate } from "react-router";
import { useEffect } from "react";
export default function AboutApp(){
    const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

     

    const clickHandler = () => {
        navigate("/about", {replace: true});
    }

    return (
        <div className="aboutHow">
            <TextBlockLeft
                header="Miten sovellus toimii?"
                body="MyID perustuu lohkoketjuteknologiaan, eli lyhyesti sanottuna 
                käyttäjän tallentamia tietoja ei säilytetä perinteisesti tietokannassa. 
                Lohkoketjulla tarkoitetaan desentralisoitua teknologiaa, 
                joka mahdollistaa sen, että lohkoketjun eri osapuolet voivat luoda 
                ja ylläpitää erilaisia hajautettuja ja jaettuja tietokantoja. 

                Desentralisoidulla teknologialla tarkoitetaan sitä, 
                että sillä ei ole vain yhtä pitäjää/omistajaa, vaan kostuu lohkoista, 
                jotka kirjataan ketjuun hash salausta käyttäen. 
                Hashing algoritmi toimii lohkoketjussa siten, että jokainen 
                onnistunut siirto säilyttää osan aikaisemmin tehdystä siirrosta ja 
                salaa sen lohkoon. Lohkon dataa ei voida muuttaa, vaan dataa lisätään 
                aina uuteen lohkoon, joka on kopio edellisestä lohkosta. Lohkoketjuun 
                voi vain lisätä dataa, ja uusi data ei voi olla ristiriidassa 
                jo olemassa olevan datan kanssa, sekä itse data on lukittu omistajalle."
                path="../images/how.png"
            />
            <TextBlockRight
                header="Mitä olisi hyvä tietää?"
                body="Kun tallennat tietoja sovellukseen, tarkista huolella 
                tietojesi oikeellisuus. Tiedot lähetetään valtuutetulle 
                (Trafi, Kela, Suomen Poliisi). Kun tiedot on tarkastettu, 
                datasi lisätään lohkoketjuun. Mikäli tietosi todetaan 
                viallisiksi tai korttisi/passisi on vanhentunut, saat 
                korttiisi leiman jossa kerrotaan sen olevan kelvoton 
                tunnistautumista varten. Voit uusia tietosi lisäämällä 
                uuden version kortistasi tai passistasi. Aina viimeisin 
                lisätty kortti näkyy tililläsi.

                Sovelluksen bugit voi ilmoittaa osoitteeseen 
                vilho.luoma@gmail.com"
                path="../images/women.png"
                last={true}
            />
            <button className="logoutBtn stickyBtn" onClick={clickHandler}>Takaisin</button>
            <div>
            </div>
            
        </div>
    )
}