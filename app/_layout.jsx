import '../global.css';

import { Slot, Stack } from 'expo-router';

export default function Layout() {
  return (<Stack>
  <Stack.Screen name="index" option={{headerShown: false}}/>
</Stack>)
}
