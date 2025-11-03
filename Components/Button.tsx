import { Text, TouchableOpacity } from 'react-native';

function Button({backgroundColor, title, color = 'white', flex = 1, disabled = false, onClick}) {
    return(
        <TouchableOpacity disabled={disabled} style={{flex: flex, flexBasis: flex*80, backgroundColor: backgroundColor, justifyContent: 'center'}} onPress={onClick}>
            <Text style={{textAlign: 'center', color: color, fontSize: 24}}>{title}</Text>
        </TouchableOpacity>
    );
}

export default Button;