import React, { useState, useEffect } from 'react'
import { Text, TextInput, View, TouchableOpacity, Modal, FlatList, Image, Dimensions } from 'react-native';
import { AppImage, AppView, AppText, Touchable, AppbackgraoundImage, AppInput } from "@Component/Atoms"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { RED_BG_THEME } from '@GlobalStyles/colors';
import { fontStyle } from '@Assets/commonFont/commonFont';
import { normalizeFont, scale, scaleHeight } from '@GlobalStyles/responsive';
const { width, height } = Dimensions.get("window");
const GREY_TEXT = "rgb(149, 150, 149)"

const CategoryModal = (props) => {
    const [inputText, setInputText] = useState("")
    const [countryList, setCountryList] = useState(props.data)
    const [countryListUnfiltered, setCountryListUnfiltered] = useState(props.data)
    const [searchresultstatus, setSearchresultstatus] = useState(false)

    function handleFilter(text) {
        setInputText(text)
        setSearchresultstatus(false)
        if (text !== "") {

            let searchedCountryList = countryListUnfiltered.filter(item => (item.name.toLowerCase().includes(text.toLowerCase())) ? item : null)
            setCountryList(searchedCountryList)
            console.log("FilteredRestaurants======>", searchedCountryList)
            if (searchedCountryList.length === 0) {
                setSearchresultstatus(true)
            }
            console.log("value===>", text)
        } else {
            setCountryList(countryListUnfiltered)
        }
    }


    return (
        <Modal
            style={{ height: height / 2 }}
            animationType="none"
            transparent={true}
            visible={props.visible}
            onRequestClose={props.onRequestClose}>
            <AppView
                style={{
                    flex: 1,
                    backgroundColor: 'black',
                    justifyContent: 'center',
                    opacity: 0.8
                }}>
                <AppView style={{
                    height: height / 2,
                    width: wp("70%"), justifyContent: "center",
                    alignSelf: "center", alignItems: "center",
                    backgroundColor: 'white', paddingVertical: 15,
                    borderWidth: 1
                }}>
                    <TextInput
                        value={inputText}
                        onChangeText={(text) => { handleFilter(text) }}
                        placeholder={"Search Country"} style={{ height: hp(5), width: wp(50), borderWidth: 1, textAlign: 'center' }}
                        placeholderTextColor={GREY_TEXT}
                    />
                    <FlatList
                        data={countryList}
                        onRequestClose={() => console.log("modal has been closeds")}
                        renderItem={({ item, index }) =>
                            <AppView style={{ alignItems: 'center', }}>
                                <TouchableOpacity onPress={() => {
                                    setInputText('')
                                    setCountryList(countryListUnfiltered)
                                    props.onPress(item)
                                }}
                                    style={{
                                        flexDirection: 'row',
                                        width: wp("70%"),
                                        marginVertical: wp(2), justifyContent: 'center'
                                    }}
                                >
                                    <AppView style={{ marginHorizontal: wp(2), alignSelf: 'center', justifyContent: 'center' }}>
                                        <AppText style={{
                                            fontSize: 15,
                                            fontFamily: fontStyle.medium,
                                            fontSize: normalizeFont(20),
                                            alignSelf: 'center',
                                            textAlign: 'center',
                                            color: 'black'
                                        }}>{item.name}</AppText>
                                    </AppView>
                                </TouchableOpacity>
                            </AppView>
                        }
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={() => {
                            return <AppView style={{
                                height: 1,
                                backgroundColor: "grey", width: wp("70%")
                            }} />
                        }}
                        CancelModal={props.CancelModal}
                    />
                    <TouchableOpacity onPress={props.cancelPress}
                        style={{ borderRadius: 20, width: wp("50%"), backgroundColor: RED_BG_THEME }}>


                        <Text style={{
                            alignSelf: "center",
                            marginVertical: 10,
                            fontFamily: fontStyle.light,
                            fontSize: 20,
                            color: 'white'
                        }}>{"Cancel"}</Text>
                    </TouchableOpacity>
                </AppView>
            </AppView>
        </Modal>

    )
}
export {
    CategoryModal
}