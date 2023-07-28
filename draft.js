const [ title, setTitle ] = useState ('');
const [ textContent, setTextContent] = useState ('');
const [ phone, setPhone ] = useState('');
const [ code, setCode ] = useState ();
const [ isFirstScreen, setIsFirstScreen ] = useState(true)

let content;

if (isFirstScreen){
    setTitle('Identifiez-vous')
    setTextContent('Veuillez saisir votre numéro de téléphone, nous vous enverrons un code de confirmation.')
    content = 
    <Input  placeholder='+33'
            cursorColor = '#154C79'
            editable = {false}
            maxLength = {10}
            keyboardType = 'numeric'
            onChangeText={(value) => setPhone(value)}
            valuealue = {phone}
    />
} else {
    setTitle('Code de vérification')
    setTextContent(`Veuillez renseigner le code envoyé au numéro terminant par ********${num}.`)
    let num = phone[8]+phone[9]
    content = (
        <View style = {styles.contentContainer}>
            <Title title = 'Code de vérification'/>
            <Text style={styles.text}>Veuillez renseigner le code envoyé au numéro terminant par ******{num}.</Text>
            <Bouton textButton= 'Continuer'
                    iconName = 'arrow-right'
                    iconSize = {16}
                    iconColor = '#afb1b6'/>
            <Text style={styles.text}>Code non reçu? Renvoyer le code.</Text>
        </View>
    )
}

const handleSubmit = () => {
    setIsFirstScreen(!isFirstScreen)
    console.log('click', phone)
// verifier conformite du numero telephone - fetch route générant code
    console.log(num)
}

return (
    <View style={styles.container}>
        <Image
            style = {styles.logo}
            source = {require('../assets/LogoV1.png')}
        />
        <Title title = {title}/>
        <Text style={styles.text}>{textContent}</Text>
        {content}
                    <Bouton textButton= 'Continuer'
                iconName = 'arrow-right'
                iconSize = {16}
                iconColor = '#afb1b6'
                onPress={() => handleSubmit()}/>
    </View>

)};