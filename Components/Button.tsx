import { Text, TouchableOpacity } from 'react-native';

function Button({text, color, onClick}) {
    return(
        <TouchableOpacity style={{flex: 1, backgroundColor: color, justifyContent: 'center'}} onPress={onClick}>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 24}}>{text}</Text>
        </TouchableOpacity>
    );
}

export default Button;