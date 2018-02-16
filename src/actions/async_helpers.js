export const setIsLoading  = (isLoading)    => state => ({isLoading: isLoading})
export const setIsFetching = (isFetching)   => state => ({isFetching: isFetching})
export const setError      = (errorMessage) => state => ({error: errorMessage})
export const setSuccess    = (successMessage) => state => ({success: successMessage})

export const setIsChangingAuthState = (setIsChangingAuthState) => state => ({isChangingAuthState: setIsChangingAuthState})
