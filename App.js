import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	TouchableOpacity,
} from 'react-native';
import {
	NativeBaseProvider,
	Text,
	Card,
	Heading,
	Button,
	Box
} from 'native-base';
import Snackbar from 'react-native-snackbar';

import Icons from './components/Icons';

const itemArray = new Array(9).fill('empty');


const App = () => {
	const [isCross, setIsCross] = useState(false);
	const [winMessage, setWinMessage] = useState('');

	const changeItem = itemNumber => {
		if (winMessage) {
			return Snackbar.show({
				text: winMessage,
				backgroundColor: '#000',
				textColor: '#FFF',
			});
		}

		if (itemArray[itemNumber] !== 'empty') {
			return Snackbar.show({
				text: 'Position is already filled',
				backgroundColor: 'red',
				textColor: '#FFF',
			});
		}

		itemArray[itemNumber] = isCross ? 'cross' : 'circle';
		setIsCross(!isCross);
		checkIsWinner();
	};

	const reloadGame = () => {
		setIsCross(false);
		setWinMessage('');
		itemArray.fill('empty', 0, 9);
	};

	const checkIsWinner = () => {
		if (
			itemArray[0] !== 'empty' &&
			itemArray[0] === itemArray[1] &&
			itemArray[1] === itemArray[2]
		) {
			setWinMessage(`${itemArray[0]} won`);
		} else if (
			itemArray[3] !== 'empty' &&
			itemArray[3] === itemArray[4] &&
			itemArray[4] === itemArray[5]
		) {
			setWinMessage(`${itemArray[3]} won`);
		} else if (
			itemArray[6] !== 'empty' &&
			itemArray[6] === itemArray[7] &&
			itemArray[7] === itemArray[8]
		) {
			setWinMessage(`${itemArray[6]} won`);
		} else if (
			itemArray[0] !== 'empty' &&
			itemArray[0] === itemArray[3] &&
			itemArray[3] === itemArray[6]
		) {
			setWinMessage(`${itemArray[0]} won`);
		} else if (
			itemArray[1] !== 'empty' &&
			itemArray[1] === itemArray[4] &&
			itemArray[4] === itemArray[7]
		) {
			setWinMessage(`${itemArray[1]} won`);
		} else if (
			itemArray[2] !== 'empty' &&
			itemArray[2] === itemArray[5] &&
			itemArray[5] === itemArray[8]
		) {
			setWinMessage(`${itemArray[2]} won`);
		} else if (
			itemArray[0] !== 'empty' &&
			itemArray[0] === itemArray[4] &&
			itemArray[4] === itemArray[8]
		) {
			setWinMessage(`${itemArray[0]} won`);
		} else if (
			itemArray[2] !== 'empty' &&
			itemArray[2] === itemArray[4] &&
			itemArray[4] === itemArray[6]
		) {
			setWinMessage(`${itemArray[2]} won`);
		} else if (itemArray[0] !== 'empty' && itemArray[1] !== 'empty' && itemArray[2] !== 'empty' && itemArray[3] !== 'empty' && itemArray[4] !== 'empty' && itemArray[5] !== 'empty' && itemArray[6] !== 'empty' && itemArray[7] !== 'empty' && itemArray[8] !== 'empty') {
			setWinMessage('Game Tied');
		}
	};

	return (
		<NativeBaseProvider>

			<Box style={{ backgroundColor: "#333945", paddingVertical: 15, width: '100%' }} _text={{
				fontSize: "xl",
				fontWeight: "medium",
				color: "warmGray.50",
				letterSpacing: "lg",
				textAlign: "center"
			}}
			>
				Tic Tac Toe
			</Box>
			<View style={styles.grid}>
				{itemArray.map((item, index) => (
					<TouchableOpacity
						style={styles.box}
						key={index}
						onPress={() => changeItem(index)}
					>
						<Card style={styles.card}>
							<Icons name={item} />
						</Card>
					</TouchableOpacity>
				))}
			</View>
			{winMessage ? (
				<View>
					<Heading size='xl' style={styles.message}>{winMessage}</Heading>
					<Button
						onPress={reloadGame}
						colorScheme='primary'
						borderRadius='full'
						style={{ marginVertical: 10 }}
					>
						<Text>Play Again</Text>
					</Button>
				</View>
			) : (
				<Heading size='md' style={styles.message}>
					{isCross ? 'Cross' : 'Circle'} turn
				</Heading>
			)}

		</NativeBaseProvider>
	);
};


export default App;


const styles = StyleSheet.create({
	grid: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 20
	},
	box: {
		width: '33%',
		marginBottom: 6
	},
	card: {
		height: 120,
		justifyContent: 'center',
		alignItems: 'center'
	},
	message: {
		textAlign: 'center',
		textTransform: 'uppercase',
		color: '#fff',
		marginTop: 20,
		backgroundColor: '#4652B3',
		paddingVertical: 10,
		marginVertical: 10
	}
});