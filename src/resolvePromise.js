function resolvePromise (promiseToResolve, promiseState, notifyACB){
  if (promiseState.promise && !promiseState.data && !promiseState.error);
  if (promiseToResolve == null) return;
  promiseState.promise=promiseToResolve;
  promiseState.data= null;
  promiseState.error= null;
  if(notifyACB) notifyACB();
  function saveDataACB(result) {
    if(promiseState.promise !== promiseToResolve) return;
    promiseState.data = result;
    /* TODO Notify */
    if(notifyACB) notifyACB();
  }
  function saveErrorACB(err) {
    if(promiseState.promise !== promiseToResolve) return;
    /* TODO save error in promiseState, as before */
    promiseState.data = null;
    promiseState.error = err;
    /* TODO Notify */
    if(notifyACB) notifyACB();
  }
  promiseToResolve.then(saveDataACB).catch(saveErrorACB);
}
export default resolvePromise
