const connectBluetooth = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['heart_rate'] }]
      });
  
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('heart_rate');
      const characteristic = await service.getCharacteristic('heart_rate_measurement');
  
      characteristic.startNotifications();
      characteristic.addEventListener('characteristicvaluechanged', handleHeartRateChanged);
    } catch (error) {
      console.error('Bluetooth connection failed', error);
    }
  };
  
  function handleHeartRateChanged(event) {
    const value = event.target.value;
    const heartRate = value.getUint8(1); // usually at byte 1
    document.getElementById('heartRateDisplay').textContent = `${heartRate} bpm`;
  }
  