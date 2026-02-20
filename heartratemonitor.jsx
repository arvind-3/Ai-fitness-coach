import { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function HeartRateMonitor() {
  const [connected, setConnected] = useState(false);
  const [heartRate, setHeartRate] = useState(null);

  const connectBluetooth = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ["heart_rate"] }],
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService("heart_rate");
      const characteristic = await service.getCharacteristic("heart_rate_measurement");

      characteristic.startNotifications();
      characteristic.addEventListener("characteristicvaluechanged", (event) => {
        const value = event.target.value;
        const rate = value.getUint8(1);
        setHeartRate(rate);
      });

      setConnected(true);
    } catch (error) {
      console.error("Bluetooth connection failed", error);
      setConnected(false);
    }
  };

  return (
    <div className="p-6 max-w-md bg-white rounded-2xl shadow-md space-y-4 border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-800">Wearable Device Data</h2>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-full">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24">
              <path d="M20 13V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6M16 21v-4M8 21v-4m8-4h2a2 2 0 0 1 2 2v1m-6 1h-4m-2-2a2 2 0 0 1-2-2H4v-1a2 2 0 0 1 2-2h2"></path>
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500">Heart Rate</p>
            <p className="text-2xl font-bold text-black">
              {heartRate !== null ? `${heartRate} bpm` : "-- bpm"}
            </p>
          </div>
        </div>

        <div className={`px-3 py-1 rounded-md text-sm font-medium flex items-center space-x-1 ${
          connected ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-500"
        }`}>
          {connected && <CheckCircle className="w-4 h-4" />}
          <span>{connected ? "Connected" : "Disconnected"}</span>
        </div>
      </div>

      <button
        onClick={connectBluetooth}
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl transition duration-200"
      >
        {connected ? "Reconnect Device" : "Connect Device"}
      </button>
    </div>
  );
}
