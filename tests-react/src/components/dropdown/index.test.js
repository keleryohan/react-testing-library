import Dropdown from ".";
import { screen, render, userEvent } from "../../tests";

/* verificando se:
dropdown começa fechado
ao abrir exibe as opções
ao ter uma opção selecionada, exibe o valor e fecha
*/

const title = "selecione";
const options = ["1", "2", "3", "4"];

describe("Dropdown", () => {
  it("should start closed", () => {
    render(<Dropdown title={title} options={options} onSelect={() => {}} />);
    //obs: métodos get se não encontrar o elemento dá erro. enquanto query retorna nulo mas não dá erro
    expect(screen.queryByText(options[0])).not.toBeInTheDocument(); //nesse caso, esperamos que não haja um elemento '1' no documento
    expect(screen.queryByText(options[1])).not.toBeInTheDocument();
    expect(screen.queryByText(options[2])).not.toBeInTheDocument();
    //expect(screen.queryByText("4")).toBeInTheDocument();
  });

  it("should show options when open", () => {
    render(<Dropdown title={title} options={options} onSelect={() => {}} />);

    //encontrando o botão do dropdown
    const dropDownButton = screen.getByRole("button", { name: title });

    //simulando o clique do usuário no botão
    userEvent.click(dropDownButton);

    //encontrando os elementos. dessa vez usando o get, se não encontrar é pra dar erro
    expect(screen.getByText(options[0])).toBeInTheDocument();
    expect(screen.getByText(options[1])).toBeInTheDocument();
    expect(screen.getByText(options[2])).toBeInTheDocument();
    expect(screen.getByText(options[3])).toBeInTheDocument();
  });

  it("should, when an option is selected, close and execute onSelect function", () => {
    //simulando a função onSelect com jest
    const onSelect = jest.fn();

    render(<Dropdown title={title} options={options} onSelect={onSelect} />);

    //encontrando o botão do dropdown
    const dropDownButton = screen.getByRole("button", { name: title });

    //abrindo as opções
    userEvent.click(dropDownButton);

    //opções sendo exibidas
    expect(screen.getByText(options[0])).toBeInTheDocument();
    expect(screen.getByText(options[1])).toBeInTheDocument();
    expect(screen.getByText(options[2])).toBeInTheDocument();
    expect(screen.getByText(options[3])).toBeInTheDocument();

    //encontrando uma opção
    const option = screen.getByText(options[1]);

    //clicando na opção
    userEvent.click(option);

    //função onSelect foi chamada
    expect(onSelect).toHaveBeenCalledWith(options[1]);

    //opções n sendo mais exibidas (fechou)
    expect(screen.queryByText(options[0])).not.toBeInTheDocument();
    expect(screen.queryByText(options[1])).not.toBeInTheDocument();
    expect(screen.queryByText(options[2])).not.toBeInTheDocument();
    expect(screen.queryByText(options[3])).not.toBeInTheDocument();
  });
});
