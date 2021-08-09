const calculateBmi = (weight: number, height: number): string => {
    const bmi = weight * 703 / (height ** 2)

    if (bmi < 16) { 
        return "underweight (severe thinness)"
    }
    if (bmi < 17) {
        return "underweight (moderate thinness)"
    }
    if (bmi < 18.5) {
        return "underweight (mild thinness)"
    }
    if (bmi < 25) {
        return "normal range"
    }
    if (bmi < 30) {
        return "overweight (pre-obese)"
    }
    if (bmi < 35) {
        return "obese (class I)"
    }
    if (bmi < 40) {
        return "obese (class II)"
    }
    return "obese (class III)"
}

console.log(calculateBmi(180, 74))
