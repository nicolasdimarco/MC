import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";

afterEach(() => {
  vi.useRealTimers();
});

describe("App", () => {
  it("muestra la información principal en español", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        name: /promoviendo prácticas sostenibles y economía circular en villa lago meliquina/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /meliquinacircular@gmail.com/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /\+54 9 2972433181/i }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: /servicios/i }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: /Plan estratégico/i }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: /impacto/i }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", { name: /Plan estratégico/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Proyección de cambios para Meliquina/i,
      }),
    ).toBeInTheDocument();
  });

  it("mantiene el orden correcto de navegación incluyendo impacto esperado", () => {
    render(<App />);

    const desktopNav = screen.getByRole("navigation", {
      name: /navegación principal/i,
    });
    const navLinks = within(desktopNav).getAllByRole("link");

    expect(navLinks.map((link) => link.textContent)).toEqual([
      "La cooperativa",
      "Plan estratégico",
      "Servicios",
      "Impacto",
      "Contacto",
    ]);
  });

  it("abre y cierra el menú móvil", () => {
    render(<App />);

    const menuButton = screen.getByRole("button", { name: /abrir menú/i });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("button", { name: /cerrar menú/i }),
    ).toBeInTheDocument();
  });

  it("anima los números de panorama de la comunidad desde 0 hasta su valor final", () => {
    vi.useFakeTimers();
    render(<App />);

    expect(screen.getByText("0+")).toBeInTheDocument();
    expect(screen.getByText("0x")).toBeInTheDocument();
    expect(screen.getByText("0%")).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(2000);
    });

    expect(screen.getByText("400+")).toBeInTheDocument();
    expect(screen.getByText("5x")).toBeInTheDocument();
    expect(screen.getByText("85%")).toBeInTheDocument();
  });
});
