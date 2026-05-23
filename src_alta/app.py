def somar(a: float, b: float) -> float:
    return a + b


def dividir(a: float, b: float) -> float:
    if b == 0:
        raise ValueError("Divisao por zero nao permitida.")

    return a / b
