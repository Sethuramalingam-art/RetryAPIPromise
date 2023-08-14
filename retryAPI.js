//test function
//return success/fail based on retries values
//Implement a function in JavaScript that retries promises N number of times
let testPromise = () => {
  let count = 0;
  return () => {
    return new Promise((resolve, reject) => {
      count += 1;
      if (count <= 5) {
        reject("I am failed API");
      } else {
        resolve("I am successfull");
      }
    });
  };
};

const retry = async (fn, retires, finalErr) => {
  try {
    const response = await fn();
    return response;
  } catch (err) {
    if (retires === 1) {
      return Promise.reject(finalErr);
    }

    return retry(fn, retires - 1, finalErr);
  }
};
retry(testPromise(), 6, "I am failure")
  .then((val) => {
    console.log(val);
  })
  .catch((err) => {
    console.log(err);
  });
// I am successfull if retires count 6
retry(testPromise(), 5, "I am failure")
  .then((val) => {
    console.log(val);
  })
  .catch((err) => {
    console.log(err);
  });
// I am failure if retires count 5 or less than 5

=============================================================================

//Implement a function in JavaScript that retries promises N number of times with a delay between each call.

Input:
retry(asyncFn, retries = 3, delay = 50, finalError = 'Failed');

Output:
... attempt 1 -> failed
... attempt 2 -> retry after 50ms -> failed
... attempt 3 -> retry after 50ms -> failed
... Failed.

  const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
};

//Promise retry design pattern in JavaScript

const retryWithDelay = async (
  fn,
  interval = 50,
  retires = 3,
  finalErr = "Retry failed"
) => {
  try {
    await fn();
  } catch (err) {
    // if no retries left
    // throw error
    if (retires <= 0) {
      return Promise.reject(finalErr);
    }
    //delay the next call
    await wait(interval);
    return retryWithDelay(fn, retires - 1, interval, finalErr);
  }
};

//Input:
//Test Function:
const getTestFunc = () => {
  let callCounter = 0;
  return async () => {
    callCounter += 1;
    // if called less than 5 times
    // throw error
    if (callCounter < 5) {
      throw new Error("Not yet");
    }
  };
};

//Test the code
const test = async () => {
  await retryWithDelay(getTestFunc(), 10);
  console.log("success");
  await retryWithDelay(getTestFunc(), 3);
  console.log("will fail before getting here");
};

test().then().catch(console.error);
//success
// will fail before getting here
