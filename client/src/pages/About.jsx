import TextBlockLeft from "../components/TextBlockLeft";
import TextBlockRight from "../components/TextBlockRight";
import { Link } from "react-router-dom";

export default function About(){
    return (
        <div className="about">
            <TextBlockLeft
                header="Luo ensin käyttäjä "
                body="Rekisteröidy sovellukseen luomalla käyttäjä. 
                        Sovellus arpoo sinulle sen jälkeen 
                        satunnaisen tunnuksen, jota käytetään
                        aina kun lisäät tilillesi jotain."
                path="./images/first.png"/>
            <TextBlockRight
                header="Lisää haluttu tunnistautumistapa"
                body="Voit lisätä voimassaolevan ajokortin,
                        kelakortin tai passin sovellukseen.
                        Varmista että sinulla on selkeät kuvat kortista sekä edestä,
                        että takaa."
                path="./images/second.png"
                />
            <TextBlockLeft
                header="Pyyntösi käsittely"
                body="Tarkastuksen suorittaa valtuutettu, 
                        joka tarkistaa syöttämäsi tietojen oikeellisuuden ja voimassaolon. 
                        Jos kaikki on kunnossa, saat digitaalisen version 
                        kortistasi tai passistasi. Jos tiedot eivät täsmää, 
                        pyyntösi hylätään ja korttisi ei kelpaa tunnistautumiseen."
                path="./images/third.png"
                />
            <TextBlockRight
                header="Kaikki valmista"
                body="Löydät uuden digitaalisen korttisi tililtäsi. 
                        Huom. Jos haluat päivittää tietojasi, 
                        joudut tallentamaan uuden kortin. 
                        Voit halutessasi lukea lisää miksi tästä."
                path="./images/fourth.png"
                link="/about/how"
                linktext="Lisätietoja"
            />

                
        </div>
    )
}