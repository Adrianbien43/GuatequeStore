package com.example.android.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.android.R;
import com.example.android.model.Proveedor;
import com.example.android.model.TelefonoProveedor;

import java.util.List;

public class ProveedorAdapter extends RecyclerView.Adapter<ProveedorAdapter.ViewHolder> {

    private List<Proveedor> lista;
    private OnItemClickListener listener;

    public interface OnItemClickListener {
        void onEditClick(Proveedor proveedor);
        void onDeleteClick(Proveedor proveedor);
    }

    public ProveedorAdapter(List<Proveedor> lista, OnItemClickListener listener) {
        this.lista = lista;
        this.listener = listener;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_proveedor, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder h, int i) {
        Proveedor p = lista.get(i);
        h.tvNombre.setText(p.getNombre());
        h.tvDireccion.setText(p.getDireccion() != null ? p.getDireccion() : "Sin dirección");

        StringBuilder tels = new StringBuilder();
        if (p.getTelefonos() != null) {
            for (int j = 0; j < p.getTelefonos().size(); j++) {
                TelefonoProveedor t = p.getTelefonos().get(j);
                tels.append(t.getTelefono()).append(" (").append(t.getTipo()).append(")");
                if (j < p.getTelefonos().size() - 1) tels.append(" | ");
            }
        }
        h.tvTelefonos.setText(tels.length() > 0 ? tels.toString() : "Sin teléfonos");

        h.btnEdit.setOnClickListener(v -> listener.onEditClick(p));
        h.btnDelete.setOnClickListener(v -> listener.onDeleteClick(p));
    }

    @Override
    public int getItemCount() { return lista.size(); }

    public void actualizarLista(List<Proveedor> nueva) {
        this.lista = nueva;
        notifyDataSetChanged();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvNombre, tvDireccion, tvTelefonos;
        ImageButton btnEdit, btnDelete;

        ViewHolder(View v) {
            super(v);
            tvNombre = v.findViewById(R.id.tvNombre);
            tvDireccion = v.findViewById(R.id.tvDireccion);
            tvTelefonos = v.findViewById(R.id.tvTelefonos);
            btnEdit = v.findViewById(R.id.btnEdit);
            btnDelete = v.findViewById(R.id.btnDelete);
        }
    }
}