import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Alert,
	ActivityIndicator,
	useWindowDimensions,
} from "react-native";
import { theme } from "../../theme";
import { registerForPushNotificationsAsync } from "../../utils/registerForPushNotificationsAsync";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import { Duration, intervalToDuration, isBefore } from "date-fns";
import { TimeSegment } from "../../components/TimeSegment";
import { getFromStorage, saveToStorage } from "../../utils/storage";
import * as Haptics from "expo-haptics";
import ConfettiCannon from "react-native-confetti-cannon";

// 10 seconds
// const frequency = 10 * 1000;
// two weeks
const frequency = 14 * 24 * 60 * 60 * 1000;

export const countdownStorageKey = "taskly-countdown";

export type PersistedCountdownState = {
	currentNotificationId: string | undefined;
	completedAtTimestamp: number[];
};

type CountdownStatus = {
	isOverdue: boolean;
	distance: Duration;
};

export default function CounterScreen() {
	const { width } = useWindowDimensions();
	const confettiRef = useRef<any>();
	const [isLoading, setIsLoading] = useState(true);
	const [countdownState, setCountdownState] =
		useState<PersistedCountdownState>();

	const [status, setStatus] = useState<CountdownStatus>({
		isOverdue: false,
		distance: {},
	});
	// console.log(status);

	// const [secondsElapsed, setSecondsElapsed] = useState(0);

	const lastCompletedTimestamp = countdownState?.completedAtTimestamp[0];

	useEffect(() => {
		const init = async () => {
			const value = await getFromStorage(countdownStorageKey);
			setCountdownState(value);
		};
		init();
	}, []);

	useEffect(() => {
		const intervalId = setInterval(() => {
			const timestamp = lastCompletedTimestamp
				? lastCompletedTimestamp + frequency
				: Date.now();
			if (lastCompletedTimestamp) {
				setIsLoading(false);
			}
			const isOverdue = isBefore(timestamp, Date.now());
			const distance = intervalToDuration(
				isOverdue
					? { start: timestamp, end: Date.now() }
					: { start: Date.now(), end: timestamp }
			);
			setStatus({ isOverdue, distance });
			// setSecondsElapsed((val) => val + 1);
		}, 1000);
		return () => {
			clearInterval(intervalId);
		};
	}, [lastCompletedTimestamp]);

	const scheduleNotification = async () => {
		Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
		let pushNotificationId;
		const result = await registerForPushNotificationsAsync();
		if (result === "granted") {
			pushNotificationId = await Notifications.scheduleNotificationAsync({
				content: {
					title: "Thing is due!",
				},
				trigger: {
					seconds: frequency / 1000,
				},
			});
		} else {
			if (Device.isDevice) {
				Alert.alert(
					"Unable to schedule notifications",
					"Enable the notification permission for Expo Go in settings"
				);
			}
		}
		if (countdownState?.currentNotificationId) {
			await Notifications.cancelScheduledNotificationAsync(
				countdownState?.currentNotificationId
			);
		}

		const newCountdownState: PersistedCountdownState = {
			currentNotificationId: pushNotificationId,
			completedAtTimestamp: countdownState
				? [Date.now(), ...countdownState.completedAtTimestamp]
				: [Date.now()],
		};
		setCountdownState(newCountdownState);
		await saveToStorage(countdownStorageKey, newCountdownState);
		// console.log(result);
	};

	if (isLoading) {
		return (
			<View style={styles.activityIndicatorContainer}>
				<ActivityIndicator />
			</View>
		);
	}

	return (
		<View
			style={[
				styles.container,
				status.isOverdue ? styles.containerLate : undefined,
			]}>
			{/* <Text>{secondsElapsed}</Text> */}
			{status.isOverdue ? (
				<Text style={[styles.heading, styles.whiteText]}>Thing overdue by</Text>
			) : (
				<Text style={styles.heading}>Thing due in...</Text>
			)}
			<View style={styles.row}>
				<TimeSegment
					unit="Days"
					number={status.distance.days ?? 0}
					textStyle={status.isOverdue ? styles.whiteText : undefined}
				/>
				<TimeSegment
					unit="Hours"
					number={status.distance.hours ?? 0}
					textStyle={status.isOverdue ? styles.whiteText : undefined}
				/>
				<TimeSegment
					unit="Minutes"
					number={status.distance.minutes ?? 0}
					textStyle={status.isOverdue ? styles.whiteText : undefined}
				/>
				<TimeSegment
					unit="Seconds"
					number={status.distance.seconds ?? 0}
					textStyle={status.isOverdue ? styles.whiteText : undefined}
				/>
			</View>
			<TouchableOpacity
				style={styles.button}
				activeOpacity={0.8}
				onPress={scheduleNotification}>
				<Text style={styles.buttonText}>I've washed the car!</Text>
			</TouchableOpacity>
			<ConfettiCannon
				ref={confettiRef}
				count={50}
				origin={{ x: width / 2, y: -20 }}
				autoStart={false}
				fadeOut
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
	},
	containerLate: {
		backgroundColor: theme.colorRed,
	},
	button: {
		backgroundColor: theme.colorBlack,
		padding: 12,
		borderRadius: 6,
	},
	buttonText: {
		color: theme.colorWhite,
		fontWeight: "bold",
		textTransform: "uppercase",
		letterSpacing: 1,
	},
	row: {
		flexDirection: "row",
	},
	heading: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 24,
	},
	whiteText: {
		color: theme.colorWhite,
	},
	activityIndicatorContainer: {
		backgroundColor: theme.colorWhite,
		justifyContent: "center",
		alignItems: "center",
		flex: 1,
	},
});
