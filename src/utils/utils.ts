import dayjs from 'dayjs'
import { Modal } from 'bootstrap'

/**
 * Extracts query parameters from a given URL
 * @param url - The URL string to parse. Defaults to the current browser URL.
 * @returns An object containing the query parameters as key-value pairs
 */
export const getQueryParams = (url: string = window.location.href): Record<string, string> => {
  try {
    const params = new URL(url).searchParams
    const queryParams: Record<string, string> = {}

    for (const [key, value] of params.entries()) {
      queryParams[key] = value
    }

    return queryParams
  } catch (error) {
    console.error('Error extracting query parameters:', error)
    return {}
  }
}

export const commonDateFormat = (date: Date | null | string, formate: string = 'YYYY/MM/DD') => {
  return date ? dayjs(date).format(formate) : ''
}

export const handleCloseModal = (name: string) => {
  const modalElement = document.getElementById(name)
  if (modalElement) {
    const bsModal = Modal.getInstance(modalElement) || new Modal(modalElement)
    bsModal.hide()
  }
  const backdrop = document.querySelector('.modal-backdrop')
  if (backdrop) {
    backdrop.remove()
  }
}

export const handleOpenModal = (name: string) => {
  const modalElement = document.getElementById(name)
  if (modalElement) {
    const bsModal = new Modal(modalElement)
    bsModal.show()
  }
}

export function capitalizeFirstLetter(str: string): string {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''
}

// Function to set an item in localStorage
export function setLocalStorage<T>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value)
    localStorage.setItem(key, serializedValue)
  } catch (error) {
    console.error(`Error setting item in localStorage: ${error}`)
  }
}

// Function to get an item from localStorage
export function getLocalStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key)
    return item ? (JSON.parse(item) as T) : null
  } catch (error) {
    console.error(`Error getting item from localStorage: ${error}`)
    return null
  }
}

// Function to remove an item from localStorage
export function removeLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.error(`Error removing item from localStorage: ${error}`)
  }
}

// Function to clear all items from localStorage
export function clearLocalStorage(): void {
  try {
    localStorage.clear()
  } catch (error) {
    console.error(`Error clearing localStorage: ${error}`)
  }
}

// Function to check if a key exists in localStorage
export function existsInLocalStorage(key: string): boolean {
  return localStorage.getItem(key) !== null
}

export const REVIEW_CHANGES = 'REVIEW_CHANGES'

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

export function base64ToFile(base64String: string, fileName: string, mimeType: string): File {
  const byteCharacters = atob(base64String.split(',')[1])
  const byteNumbers = new Array(byteCharacters.length)

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }

  const byteArray = new Uint8Array(byteNumbers)
  return new File([byteArray], fileName, { type: mimeType })
}
