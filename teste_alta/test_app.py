import pytest  # type: ignore
from src_alta.app import somar, dividir


def test_somar() -> None:
    assert somar(2, 3) == 5


def test_dividir_por_zero() -> None:
    with pytest.raises(ValueError):  # type: ignore
        dividir(10, 0)
