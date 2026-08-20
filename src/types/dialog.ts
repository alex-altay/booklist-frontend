type DialogResolve = (value: boolean | PromiseLike<boolean>) => void
type DialogReject = (reason?: unknown) => void

export {
  type DialogReject,
  type DialogResolve,
}
