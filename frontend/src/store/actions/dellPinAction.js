const DELL_PIN = "DELL_PIN"
export const dellPin = (state, index) => {
    return {
      type: DELL_PIN,
      user: state,
      payload: {
        index
      }
    };
  };