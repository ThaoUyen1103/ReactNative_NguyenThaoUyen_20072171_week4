import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';

const CartScreen = () => {
    const [quantity, setQuantity] = useState(1);
    const [discountCode, setDiscountCode] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState(null); // Lưu trữ mã giảm giá đã áp dụng
    const [discountsCode, setDiscountsCode] = useState([]); // Danh sách mã giảm giá đã lưu

    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const productPrice = 141800;
    const discountRates = {
        'DISCOUNT2024': 0.1, // Giảm 10%
        'SAVE20': 0.2,       // Giảm 20%
        'OFFER10': 0.05,     // Giảm 5%
    };

    const applyDiscountCode = () => {
        // Chọn ngẫu nhiên một mã giảm giá từ danh sách
        const randomCode = Object.keys(discountRates)[Math.floor(Math.random() * Object.keys(discountRates).length)];
        const discount = discountRates[randomCode];

        // Nếu đã áp dụng mã giảm giá, không làm gì cả
        if (appliedDiscount) {
            alert('Mã giảm giá đã được áp dụng');
            return;
        }

        // Cập nhật mã giảm giá vào ô nhập liệu
        setDiscountCode(randomCode);

        // Cập nhật mã giảm giá đã áp dụng
        if (discount) {
            const discountAmount = productPrice * discount;
            setAppliedDiscount({ code: randomCode, amount: discountAmount });
        }
    };

    const totalDiscount = appliedDiscount ? appliedDiscount.amount : 0;
    const totalPrice = (productPrice * quantity) - totalDiscount;

    return (
        <SafeAreaView style={styles.backgroundContainer}>
            <View style={styles.containerHeader}>
                <View style={styles.container}>
                    <Image source={require('../assets/images/book.jpg')} style={styles.image} />
                    <View style={{ paddingRight: 5 }}>
                        <Text style={styles.productTitle}>Nguyên hàm tích phân và ứng dụng</Text>
                        <Text style={styles.productTitle}>Cung cấp bởi Tiki Trading</Text>
                        <Text style={styles.seller}>{productPrice.toLocaleString()}đ</Text>
                        <Text style={styles.originalPrice}>{productPrice.toLocaleString()}đ</Text>

                        <View style={styles.quantityContainer}>
                            <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
                                <Text style={styles.quantityButtonText}>-</Text>
                            </TouchableOpacity>
                            <Text style={styles.quantityText}>{quantity}</Text>
                            <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
                                <Text style={styles.quantityButtonText}>+</Text>
                            </TouchableOpacity>

                            <Text style={styles.textMuaSau}>Mua sau</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.container}>
                    <Text style={styles.textMaGiamGia}>Mã giảm giá đã lưu</Text>
                    <Text style={styles.textXemtaiday}>Xem tại đây</Text>
                </View>

                <View style={styles.container}>
                    <View style={{ paddingHorizontal: 20 }}>
                        <TextInput
                            style={styles.inputMaGiamGia}
                            placeholder="MÃ GIẢM GIÁ"
                            value={discountCode} // Hiển thị mã giảm giá hiện tại
                            onChangeText={setDiscountCode}
                            editable={false} // Chỉ đọc, không cho phép người dùng thay đổi trực tiếp
                        />
                    </View>

                    <View style={styles.buttonApDung}>
                        <TouchableOpacity onPress={applyDiscountCode}>
                            <Text style={styles.textApDung}>Áp dụng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.containerF}>
                <View style={styles.container}>
                    <Text style={styles.textGift}>Bạn có phiếu quà tặng Tiki/Got it/ Urbox?</Text>
                    <Text style={styles.textNhaptaiday}>Nhập tại đây?</Text>
                </View>
            </View>

            <View style={styles.containerF}>
                <View style={styles.container}>
                    <Text style={styles.textTamTinh}>Tạm tính</Text>
                    <Text style={styles.seller}>{(productPrice * quantity).toLocaleString()}đ</Text>
                </View>
            </View>

            <View style={styles.containerFooter}>
                <View style={styles.container}>
                    <Text style={styles.textThanhtien}>Thành tiền</Text>
                    <Text style={styles.seller}>{totalPrice.toLocaleString()}đ</Text>
                </View>
                <View style={styles.buttonThanhtoan}>
                    <TouchableOpacity>
                        <Text style={styles.textApDung}>TIẾN HÀNH ĐẶT HÀNG</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        backgroundColor: '#d0d6d5',
    },
    containerHeader: {
        height: 280,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'white',
        paddingBottom: 10,
    },
    container: {
        paddingVertical: 10,
        flexDirection: 'row',
    },
    image: {
        width: 150,
        height: 165,
        resizeMode: 'contain',
    },
    productTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        paddingVertical: 5,
        paddingHorizontal: 7,
    },
    seller: {
        color: '#e61e38',
        paddingVertical: 5,
        paddingHorizontal: 7,
        fontSize: 17,
        fontWeight: 'bold',
    },
    originalPrice: {
        textDecorationLine: 'line-through',
        color: '#888',
        paddingVertical: 5,
        paddingHorizontal: 7,
        fontSize: 12,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 7,
        marginRight: 5,
    },
    quantityButton: {
        width: 30,
        height: 30,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        fontSize: 18,
    },
    quantityText: {
        marginHorizontal: 10,
        fontSize: 16,
    },
    textMuaSau: {
        paddingHorizontal: 85,
        color: 'blue',
    },
    textMaGiamGia: {
        paddingHorizontal: 20,
        fontWeight: 'bold',
        fontSize: 13,
    },
    textXemtaiday: {
        paddingHorizontal: 5,
        fontWeight: 'bold',
        fontSize: 13,
        color: 'blue',
    },
    inputMaGiamGia: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        color: "gray",
        height: 33,
        width: 250,
        textAlign: 'center', // Center text in input
    },
    buttonApDung: {
        backgroundColor: '#2261e0',
        height: 32,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    textApDung: {
        color: 'white',
    },
    containerF: {
        height: 60,
        marginTop: 20,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: 23,
    },
    textGift: {
        fontWeight: 'bold',
        fontSize: 13,
        paddingRight: 15,
    },
    textNhaptaiday: {
        fontWeight: 'bold',
        fontSize: 13,
        color: 'blue',
    },
    textTamTinh: {
        fontWeight: 'bold',
        fontSize: 17,
        paddingRight: 200,
        paddingVertical: 5,
    },
    containerFooter: {
        height: 90,
        marginTop: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: 23,
    },
    textThanhtien: {
        fontWeight: 'bold',
        fontSize: 17,
        paddingRight: 185,
        color: 'darkgray',
    },
    buttonThanhtoan: {
        backgroundColor: '#e61e38',
        height: 32,
        width: 360,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
});

export default CartScreen;
